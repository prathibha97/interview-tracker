// lib/data/dashboard.ts

import { db } from '@/lib/db';
import { CandidateStatus, InterviewStatus } from '@/lib/generated/prisma';
import { addDays, subDays, subMonths } from 'date-fns';

export async function getUpcomingInterviews(limit = 5) {
  try {
    const now = new Date();
    const nextWeek = addDays(now, 7);

    const interviews = await db.interview.findMany({
      where: {
        startTime: {
          gte: now,
          lte: nextWeek,
        },
        status: InterviewStatus.SCHEDULED,
      },
      include: {
        candidate: true,
        position: true,
      },
      orderBy: {
        startTime: 'asc',
      },
      take: limit,
    });

    return interviews;
  } catch (error) {
    console.error('Failed to fetch upcoming interviews:', error);
    return [];
  }
}

export async function getRecentCandidates(limit = 5) {
  try {
    const candidates = await db.candidate.findMany({
      include: {
        position: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return candidates;
  } catch (error) {
    console.error('Failed to fetch recent candidates:', error);
    return [];
  }
}

export async function getDashboardStats() {
  try {
    // Total candidates
    const totalCandidates = await db.candidate.count();

    // Total candidates from previous month for comparison
    const lastMonth = subMonths(new Date(), 1);
    const totalCandidatesLastMonth = await db.candidate.count({
      where: {
        createdAt: {
          lt: lastMonth,
        },
      },
    });

    // Calculate percentage change
    const candidateChange =
      totalCandidatesLastMonth === 0
        ? 100
        : Math.round(
            ((totalCandidates - totalCandidatesLastMonth) /
              totalCandidatesLastMonth) *
              100
          );

    // Scheduled interviews
    const now = new Date();
    const nextWeek = addDays(now, 7);
    const scheduledInterviews = await db.interview.count({
      where: {
        startTime: {
          gte: now,
          lte: nextWeek,
        },
        status: InterviewStatus.SCHEDULED,
      },
    });

    // Completed interviews in the last 30 days
    const thirtyDaysAgo = subDays(now, 30);
    const completedInterviews = await db.interview.count({
      where: {
        endTime: {
          gte: thirtyDaysAgo,
          lte: now,
        },
        status: InterviewStatus.COMPLETED,
      },
    });

    // Average time to hire
    const hiredCandidates = await db.candidate.findMany({
      where: {
        status: CandidateStatus.HIRED,
      },
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });

    let avgTimeToHire = 0;
    if (hiredCandidates.length > 0) {
      const totalDays = hiredCandidates.reduce((total, candidate) => {
        const daysToHire = Math.ceil(
          (candidate.updatedAt.getTime() - candidate.createdAt.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return total + daysToHire;
      }, 0);

      avgTimeToHire = Math.round(totalDays / hiredCandidates.length);
    }

    // Hardcoded time to hire change for now
    // In a real app, you'd compare with previous quarter
    const timeToHireChange = -5;

    return {
      totalCandidates,
      candidateChange,
      scheduledInterviews,
      completedInterviews,
      avgTimeToHire,
      timeToHireChange,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return {
      totalCandidates: 0,
      candidateChange: 0,
      scheduledInterviews: 0,
      completedInterviews: 0,
      avgTimeToHire: 0,
      timeToHireChange: 0,
    };
  }
}

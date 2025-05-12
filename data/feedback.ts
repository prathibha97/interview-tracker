// lib/data/feedback.ts

import { db } from '@/lib/db';

export async function getFeedbackById(id: string) {
  try {
    const feedback = await db.feedback.findUnique({
      where: { id },
      include: {
        interview: {
          include: {
            candidate: true,
            position: true,
            stage: true,
          },
        },
        candidate: true,
        interviewer: true,
        skillAssessments: true,
      },
    });

    return feedback;
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return null;
  }
}

export async function createFeedback(data: any) {
  try {
    // Create the feedback with skill assessments
    const { skillAssessments, ...feedbackData } = data;

    const feedback = await db.feedback.create({
      data: {
        ...feedbackData,
        skillAssessments: {
          create: skillAssessments || [],
        },
      },
      include: {
        interview: true,
        candidate: true,
        interviewer: true,
        skillAssessments: true,
      },
    });

    return feedback;
  } catch (error) {
    console.error('Failed to create feedback:', error);
    throw error;
  }
}

export async function updateFeedback(id: string, data: any) {
  try {
    // Update the feedback with skill assessments
    const { skillAssessments, ...feedbackData } = data;

    // Delete existing skill assessments
    await db.skillAssessment.deleteMany({
      where: { feedbackId: id },
    });

    // Create new skill assessments
    const feedback = await db.feedback.update({
      where: { id },
      data: {
        ...feedbackData,
        skillAssessments: {
          create: skillAssessments || [],
        },
      },
      include: {
        interview: true,
        candidate: true,
        interviewer: true,
        skillAssessments: true,
      },
    });

    return feedback;
  } catch (error) {
    console.error('Failed to update feedback:', error);
    throw error;
  }
}

export async function deleteFeedback(id: string) {
  try {
    // Delete the feedback (skill assessments will be cascade deleted)
    await db.feedback.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    console.error('Failed to delete feedback:', error);
    throw error;
  }
}

export async function getFeedbacksByInterviewer(interviewerId: string) {
  try {
    const feedbacks = await db.feedback.findMany({
      where: { interviewerId },
      include: {
        interview: {
          include: {
            candidate: true,
            position: true,
          },
        },
        candidate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return feedbacks;
  } catch (error) {
    console.error('Failed to fetch feedbacks by interviewer:', error);
    return [];
  }
}

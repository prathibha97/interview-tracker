// app/(dashboard)/dashboard/page.tsx

import { auth } from '@/auth';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { DashboardSummary } from '@/components/dashboard/dashboard-summary';
import {
  getDashboardStats,
  getRecentCandidates,
  getUpcomingInterviews,
} from '@/data/dashboard';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const upcomingInterviews = await getUpcomingInterviews();
  const recentCandidates = await getRecentCandidates();
  const stats = await getDashboardStats();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Overview of your interview tracking system
        </p>
      </div>

      <DashboardSummary stats={stats} />

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardOverview
          title='Upcoming Interviews'
          data={upcomingInterviews}
          viewAllHref='/dashboard/interviews'
        />
        <DashboardOverview
          title='Recent Candidates'
          data={recentCandidates}
          viewAllHref='/dashboard/candidates'
        />
      </div>
    </div>
  );
}

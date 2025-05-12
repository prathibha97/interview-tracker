// components/dashboard/dashboard-summary.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types/dashboard';
import {
  BadgeCheckIcon,
  CalendarIcon,
  TimerIcon,
  UsersIcon,
} from 'lucide-react';

interface DashboardSummaryProps {
  stats: DashboardStats;
}

export function DashboardSummary({ stats }: DashboardSummaryProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Total Candidates
          </CardTitle>
          <UsersIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.totalCandidates}</div>
          <p className='text-xs text-muted-foreground'>
            {stats.candidateChange > 0
              ? `+${stats.candidateChange}% from last month`
              : `${stats.candidateChange}% from last month`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Scheduled Interviews
          </CardTitle>
          <CalendarIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.scheduledInterviews}</div>
          <p className='text-xs text-muted-foreground'>For the next 7 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Completed Interviews
          </CardTitle>
          <BadgeCheckIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.completedInterviews}</div>
          <p className='text-xs text-muted-foreground'>In the last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Avg. Time to Hire
          </CardTitle>
          <TimerIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.avgTimeToHire} days</div>
          <p className='text-xs text-muted-foreground'>
            {stats.timeToHireChange > 0
              ? `+${stats.timeToHireChange}% from last quarter`
              : `${stats.timeToHireChange}% from last quarter`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

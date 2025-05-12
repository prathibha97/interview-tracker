// app/(dashboard)/dashboard/reports/page.tsx

import { auth } from '@/auth';
import { CandidateStatusReport } from '@/components/reports/candidate-status-report';
import { ReportFilters } from '@/components/reports/report-filters';
import { SourcesReport } from '@/components/reports/sources-report';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { PositionsReport } from '@/components/reports/positions-report';
import { TimeToHireReport } from '@/components/reports/time-to-hire-report';
import { InterviewOutcomesReport } from '@/components/reports/interview-outcomes-report';
import { MonthlyHiresReport } from '@/components/reports/monthly-hires-report';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/lib/generated/prisma';

interface ReportsPageProps {
  searchParams: {
    startDate?: string;
    endDate?: string;
    positionId?: string;
    source?: string;
    tab?: string;
  };
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  // Properly await searchParams properties at the beginning
  const searchParamsResolved = await Promise.resolve(searchParams);

  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  // Only allow admins and managers to access reports
  if (
    session.user.role !== UserRole.ADMIN &&
    session.user.role !== UserRole.MANAGER
  ) {
    redirect('/dashboard');
  }

  // Get all active positions for filters
  const positions = await db.position.findMany({
    where: { isActive: true },
    orderBy: { title: 'asc' },
  });

  // Get all sources for filters
  const sourcesRaw = await db.candidate.groupBy({
    by: ['source'],
    where: {
      source: { not: null },
    },
  });

  const sources = sourcesRaw
    .map((s) => s.source)
    .filter(Boolean)
    .sort();

  // Use the resolved searchParams
  const filters = {
    startDate: searchParamsResolved.startDate
      ? new Date(searchParamsResolved.startDate)
      : undefined,
    endDate: searchParamsResolved.endDate
      ? new Date(searchParamsResolved.endDate)
      : undefined,
    positionId: searchParamsResolved.positionId,
    source: searchParamsResolved.source,
  };

  // Determine active tab from the resolved searchParams
  const activeTab = searchParamsResolved.tab || 'candidate-status';

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Reports</h1>
        <p className='text-muted-foreground'>
          Analyze recruitment metrics and trends
        </p>
      </div>

      <ReportFilters
        positions={positions}
        sources={sources as string[]}
        activeFilters={filters}
      />

      <Tabs defaultValue={activeTab} className='space-y-6'>
        <TabsList className='w-full grid grid-cols-3 lg:grid-cols-6'>
          <TabsTrigger value='candidate-status'>Candidate Status</TabsTrigger>
          <TabsTrigger value='sources'>Sources</TabsTrigger>
          <TabsTrigger value='positions'>Positions</TabsTrigger>
          <TabsTrigger value='time-to-hire'>Time to Hire</TabsTrigger>
          <TabsTrigger value='interview-outcomes'>
            Interview Outcomes
          </TabsTrigger>
          <TabsTrigger value='monthly-hires'>Monthly Hires</TabsTrigger>
        </TabsList>

        <TabsContent value='candidate-status' className='p-0'>
          <CandidateStatusReport filters={filters} />
        </TabsContent>

        <TabsContent value='sources' className='p-0'>
          <SourcesReport filters={filters} />
        </TabsContent>

        <TabsContent value='positions' className='p-0'>
          <PositionsReport filters={filters} />
        </TabsContent>

        <TabsContent value='time-to-hire' className='p-0'>
          <TimeToHireReport filters={filters} />
        </TabsContent>

        <TabsContent value='interview-outcomes' className='p-0'>
          <InterviewOutcomesReport filters={filters} />
        </TabsContent>

        <TabsContent value='monthly-hires' className='p-0'>
          <MonthlyHiresReport filters={filters} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

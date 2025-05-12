'use client';

import { CandidateStatusReport } from '@/components/reports/candidate-status-report';
import { ReportFilters } from '@/components/reports/report-filters';
import { SourcesReport } from '@/components/reports/sources-report';
import { PositionsReport } from '@/components/reports/positions-report';
import { TimeToHireReport } from '@/components/reports/time-to-hire-report';
import { InterviewOutcomesReport } from '@/components/reports/interview-outcomes-report';
import { MonthlyHiresReport } from '@/components/reports/monthly-hires-report';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { ReportFilters as ReportFiltersType } from '@/data/reports';

interface ReportsClientProps {
  positions: { id: string; title: string }[];
  sources: string[];
  searchParams: {
    startDate?: string;
    endDate?: string;
    positionId?: string;
    source?: string;
    tab?: string;
  };
}

export function ReportsClient({
  positions,
  sources,
  searchParams,
}: ReportsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  // Initialize activeTab state from URL parameter with fallback
  const [activeTab, setActiveTab] = useState(
    searchParams.tab || 'candidate-status'
  );

  // Process filters from searchParams
  const filters: ReportFiltersType = {
    startDate: searchParams.startDate
      ? new Date(searchParams.startDate)
      : undefined,
    endDate: searchParams.endDate ? new Date(searchParams.endDate) : undefined,
    positionId: searchParams.positionId,
    source: searchParams.source,
  };

  // Update local state when URL parameters change
  useEffect(() => {
    setActiveTab(searchParams.tab || 'candidate-status');
  }, [searchParams.tab]);

  // Handle tab change with client-side navigation
  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value); // Update local state immediately for responsive UI

      // Update URL with new tab while preserving other parameters
      const params = new URLSearchParams(urlSearchParams.toString());
      params.set('tab', value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, urlSearchParams]
  );

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
        sources={sources}
        activeFilters={filters}
      />

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='space-y-6'
      >
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

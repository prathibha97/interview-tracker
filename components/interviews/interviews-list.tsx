// components/interviews/interviews-list.tsx

import { DataTable } from '@/components/ui/data-table';
import { PaginationButton } from '@/components/ui/pagination-button';
import { getInterviews } from '@/data/interview';
import { parseISO } from 'date-fns';
import { InterviewColumns } from './interviews-columns';

interface InterviewsListProps {
  page: number;
  search: string;
  status: string;
  type: string;
  date: string;
}

export async function InterviewsList({
  page,
  search,
  status,
  type,
  date,
}: InterviewsListProps) {
  // Parse date filters if provided
  let dateFrom: Date | undefined;
  let dateTo: Date | undefined;

  if (date) {
    try {
      if (date === 'today') {
        dateFrom = new Date();
        dateFrom.setHours(0, 0, 0, 0);
        dateTo = new Date();
        dateTo.setHours(23, 59, 59, 999);
      } else if (date === 'tomorrow') {
        dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() + 1);
        dateFrom.setHours(0, 0, 0, 0);
        dateTo = new Date();
        dateTo.setDate(dateTo.getDate() + 1);
        dateTo.setHours(23, 59, 59, 999);
      } else if (date === 'this-week') {
        dateFrom = new Date();
        const day = dateFrom.getDay();
        const diff = dateFrom.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        dateFrom = new Date(dateFrom.setDate(diff));
        dateFrom.setHours(0, 0, 0, 0);
        dateTo = new Date(dateFrom);
        dateTo.setDate(dateTo.getDate() + 6);
        dateTo.setHours(23, 59, 59, 999);
      } else if (date === 'next-week') {
        dateFrom = new Date();
        const day = dateFrom.getDay();
        const diff = dateFrom.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        dateFrom = new Date(dateFrom.setDate(diff + 7));
        dateFrom.setHours(0, 0, 0, 0);
        dateTo = new Date(dateFrom);
        dateTo.setDate(dateTo.getDate() + 6);
        dateTo.setHours(23, 59, 59, 999);
      } else if (date.includes('|')) {
        // Custom date range (format: "2025-05-10|2025-05-15")
        const [fromStr, toStr] = date.split('|');
        dateFrom = parseISO(fromStr);
        dateFrom.setHours(0, 0, 0, 0);
        dateTo = parseISO(toStr);
        dateTo.setHours(23, 59, 59, 999);
      }
    } catch (error) {
      console.error('Failed to parse date filter:', error);
    }
  }

  const { interviews, totalInterviews, totalPages } = await getInterviews({
    page,
    search,
    status,
    type,
    dateFrom,
    dateTo,
  });

  return (
    <div className='space-y-4'>
      <DataTable
        data={interviews}
        columns={InterviewColumns}
        emptyState={
          <div className='flex h-[400px] flex-col items-center justify-center space-y-2 p-8 text-center'>
            <h3 className='text-lg font-semibold'>No interviews found</h3>
            <p className='text-sm text-muted-foreground'>
              {search || status || type || date
                ? 'Try changing your filters or search term'
                : 'Schedule an interview to get started'}
            </p>
          </div>
        }
      />

      {totalPages > 1 && (
        <div className='flex justify-end'>
          <PaginationButton
            currentPage={page}
            totalPages={totalPages}
            baseUrl='/dashboard/interviews'
            searchParams={{ search, status, type, date }}
          />
        </div>
      )}

      <div className='text-xs text-muted-foreground'>
        {totalInterviews} interviews found
      </div>
    </div>
  );
}

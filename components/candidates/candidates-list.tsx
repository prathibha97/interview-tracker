// components/candidates/candidates-list.tsx

import { getCandidates } from '@/data/candidate';
import { DataTable } from '@/components/ui/data-table';
import { CandidateColumns } from './candidates-columns';
import { PaginationButton } from '@/components/ui/pagination-button';

interface CandidatesListProps {
  page: number;
  search: string;
  status: string;
  position: string;
}

export async function CandidatesList({
  page,
  search,
  status,
  position,
}: CandidatesListProps) {
  const { candidates, totalCandidates, totalPages } = await getCandidates({
    page,
    search,
    status,
    position,
  });

  return (
    <div className='space-y-4'>
      <DataTable
        data={candidates}
        columns={CandidateColumns}
        emptyState={
          <div className='flex h-[400px] flex-col items-center justify-center space-y-2 p-8 text-center'>
            <h3 className='text-lg font-semibold'>No candidates found</h3>
            <p className='text-sm text-muted-foreground'>
              {search || status || position
                ? 'Try changing your filters or search term'
                : 'Create a new candidate to get started'}
            </p>
          </div>
        }
      />

      {totalPages > 1 && (
        <div className='flex justify-end'>
          <PaginationButton
            currentPage={page}
            totalPages={totalPages}
            baseUrl='/dashboard/candidates'
            searchParams={{ search, status, position }}
          />
        </div>
      )}

      <div className='text-xs text-muted-foreground'>
        {totalCandidates} candidates found
      </div>
    </div>
  );
}

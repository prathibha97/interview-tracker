// components/positions/positions-list.tsx (update links)

import { getPositions } from '@/data/position';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PencilIcon, TrashIcon } from 'lucide-react';

export async function PositionsList() {
  const positions = await getPositions({
    activeOnly: false,
    includeWorkflow: true,
  });

  if (positions.length === 0) {
    return (
      <div className='flex h-[400px] flex-col items-center justify-center space-y-2 p-8 text-center border rounded-md'>
        <h3 className='text-lg font-semibold'>No positions found</h3>
        <p className='text-sm text-muted-foreground'>
          Create a position to get started
        </p>
      </div>
    );
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Workflow</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id}>
              <TableCell className='font-medium'>{position.title}</TableCell>
              <TableCell>{position.department || '—'}</TableCell>
              <TableCell>{position.workflow?.name || '—'}</TableCell>
              <TableCell>
                {position.isActive ? (
                  <Badge
                    variant='outline'
                    className='bg-green-50 text-green-600 border-0'
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant='outline'
                    className='bg-red-50 text-red-600 border-0'
                  >
                    Inactive
                  </Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(position.createdAt)}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end space-x-2'>
                  <Button size='sm' variant='outline' asChild>
                    <Link href={`/dashboard/positions/${position.id}/edit`}>
                      <PencilIcon className='h-4 w-4' />
                      <span className='sr-only'>Edit</span>
                    </Link>
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='text-red-600'
                    asChild
                  >
                    <Link href={`/dashboard/positions/${position.id}/delete`}>
                      <TrashIcon className='h-4 w-4' />
                      <span className='sr-only'>Delete</span>
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

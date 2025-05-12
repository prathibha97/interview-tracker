// components/workflows/workflows-list.tsx

import { getWorkflows } from '@/data/workflow';
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
import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';

export async function WorkflowsList() {
  const workflows = await getWorkflows();

  if (workflows.length === 0) {
    return (
      <div className='flex h-[400px] flex-col items-center justify-center space-y-2 p-8 text-center border rounded-md'>
        <h3 className='text-lg font-semibold'>No workflows found</h3>
        <p className='text-sm text-muted-foreground'>
          Create a workflow to get started
        </p>
      </div>
    );
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Workflow Name</TableHead>
            <TableHead>Stages</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows.map((workflow) => (
            <TableRow key={workflow.id}>
              <TableCell className='font-medium'>{workflow.name}</TableCell>
              <TableCell>{workflow.stages.length} stages</TableCell>
              <TableCell>
                {workflow.isDefault ? (
                  <Badge
                    variant='outline'
                    className='bg-green-50 text-green-600 border-0'
                  >
                    Default
                  </Badge>
                ) : (
                  <Badge
                    variant='outline'
                    className='bg-slate-50 text-slate-600 border-0'
                  >
                    Custom
                  </Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(workflow.createdAt)}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end space-x-2'>
                  <Button size='sm' variant='outline' asChild>
                    <Link href={`/dashboard/settings/workflows/${workflow.id}`}>
                      <ExternalLinkIcon className='h-4 w-4' />
                      <span className='sr-only'>View</span>
                    </Link>
                  </Button>
                  <Button size='sm' variant='outline' asChild>
                    <Link
                      href={`/dashboard/settings/workflows/${workflow.id}/edit`}
                    >
                      <PencilIcon className='h-4 w-4' />
                      <span className='sr-only'>Edit</span>
                    </Link>
                  </Button>
                  {!workflow.isDefault && (
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-red-600'
                      asChild
                    >
                      <Link
                        href={`/dashboard/settings/workflows/${workflow.id}/delete`}
                      >
                        <TrashIcon className='h-4 w-4' />
                        <span className='sr-only'>Delete</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

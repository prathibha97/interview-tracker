// components/interviews/interview-status-action.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Interview, InterviewStatus } from '@/lib/generated/prisma';
import { ChevronDownIcon } from 'lucide-react';
import { updateInterviewStatus } from '@/actions/interview';
import { ReloadIcon } from '@radix-ui/react-icons';

interface InterviewStatusActionProps {
  interview: Interview;
}

export function InterviewStatusAction({
  interview,
}: InterviewStatusActionProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (status: InterviewStatus) => {
    if (status === interview.status) return;

    setIsUpdating(true);

    try {
      await updateInterviewStatus(interview.id, status);
      router.refresh();
    } catch (error) {
      console.error('Failed to update interview status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isUpdating}>
          {isUpdating ? (
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <>
              Mark as <ChevronDownIcon className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => handleStatusChange(InterviewStatus.COMPLETED)}
        >
          Completed
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(InterviewStatus.CANCELED)}
        >
          Canceled
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(InterviewStatus.NO_SHOW)}
        >
          No Show
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

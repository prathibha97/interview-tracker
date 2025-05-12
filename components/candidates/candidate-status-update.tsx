// components/candidates/candidate-status-update.tsx

'use client';

import { updateCandidateStatus } from '@/actions/candidate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Candidate, CandidateStatus } from '@/lib/generated/prisma';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CandidateStatusUpdateProps {
  candidate: Candidate;
}

export function CandidateStatusUpdate({
  candidate,
}: CandidateStatusUpdateProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string>(candidate.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === candidate.status) return;

    setStatus(newStatus);
    setIsSubmitting(true);

    try {
      await updateCandidateStatus(candidate.id, newStatus);
      router.refresh();
    } catch (error) {
      console.error('Failed to update candidate status:', error);
      setStatus(candidate.status); // Revert on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <Select
        value={status}
        onValueChange={handleStatusChange}
        disabled={isSubmitting}
      >
        <SelectTrigger className='w-32'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          {Object.values(CandidateStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status.replace(/_/g, ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isSubmitting && (
        <ReloadIcon className='h-4 w-4 animate-spin text-muted-foreground' />
      )}
    </div>
  );
}

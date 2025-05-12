// app/(dashboard)/dashboard/interviews/new/page.tsx

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { InterviewForm } from '@/components/interviews/interview-form';

interface NewInterviewPageProps {
  searchParams: {
    candidateId?: string;
  };
}

export default async function NewInterviewPage({
  searchParams,
}: NewInterviewPageProps) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  // Get candidates (filtering out any non-active ones)
  const candidates = await db.candidate.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      positionId: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Get positions (only active ones)
  const positions = await db.position.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    },
  });

  // Get all users who can be interviewers (excluding system users)
  const interviewers = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Schedule Interview</h1>
        <p className='text-muted-foreground'>
          Set up a new interview with a candidate
        </p>
      </div>

      <div className='rounded-md border p-6 bg-white'>
        <InterviewForm
          defaultCandidateId={await searchParams.candidateId}
          candidates={candidates}
          positions={positions}
          interviewers={interviewers!}
        />
      </div>
    </div>
  );
}

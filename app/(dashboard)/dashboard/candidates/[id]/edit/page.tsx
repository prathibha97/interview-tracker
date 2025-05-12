// app/(dashboard)/dashboard/candidates/[id]/edit/page.tsx

import { redirect, notFound } from 'next/navigation';
import { auth } from '@/auth';
import { getCandidateById } from '@/data/candidate';
import { CandidateForm } from '@/components/candidates/candidate-form';

interface EditCandidatePageProps {
  params: {
    id: string;
  };
}

export default async function EditCandidatePage({
  params,
}: EditCandidatePageProps) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const candidate = await getCandidateById(params.id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Edit Candidate</h1>
        <p className='text-muted-foreground'>
          Update the candidate&apos;s information
        </p>
      </div>

      <div className='rounded-md border p-6 bg-white'>
        <CandidateForm candidate={candidate} isEdit />
      </div>
    </div>
  );
}

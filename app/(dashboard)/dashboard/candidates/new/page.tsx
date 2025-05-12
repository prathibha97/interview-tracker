// app/(dashboard)/dashboard/candidates/new/page.tsx

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { CandidateForm } from '@/components/candidates/candidate-form';

export default async function NewCandidatePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Add New Candidate</h1>
        <p className='text-muted-foreground'>
          Enter the details for the new candidate
        </p>
      </div>

      <div className='rounded-md border p-6 bg-white'>
        <CandidateForm />
      </div>
    </div>
  );
}

// app/(dashboard)/dashboard/settings/workflows/[id]/edit/page.tsx

import { redirect, notFound } from 'next/navigation';
import { auth } from '@/auth';
import { getWorkflowById } from '@/data/workflow';
import { WorkflowForm } from '@/components/workflows/workflow-form';
import { UserRole } from '@/lib/generated/prisma';

interface EditWorkflowPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function EditWorkflowPage({
  params,
}: EditWorkflowPageProps) {
  const session = await auth();
  const { workflowId } = await params;


  if (!session || !session.user) {
    redirect('/login');
  }

  // Check if user has permission to access this page
  if (session.user.role !== UserRole.ADMIN) {
    redirect('/dashboard');
  }

  const workflow = await getWorkflowById(workflowId);

  if (!workflow) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Edit Workflow</h1>
        <p className='text-muted-foreground'>
          Update the interview workflow details
        </p>
      </div>

      <div className='rounded-md border p-6 bg-white'>
        <WorkflowForm workflow={workflow} isEdit />
      </div>
    </div>
  );
}

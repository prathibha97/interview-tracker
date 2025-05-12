// lib/actions/interview.ts

'use server';

import { auth } from '@/auth';
import {
  createInterview as createInterviewData,
  deleteInterview as deleteInterviewData,
  updateInterview as updateInterviewData,
} from '@/data/interview';
import { revalidatePath } from 'next/cache';

export async function createInterview(data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Format dates if they are provided as strings
  if (typeof data.startTime === 'string') {
    data.startTime = new Date(data.startTime);
  }

  if (typeof data.endTime === 'string') {
    data.endTime = new Date(data.endTime);
  }

  // Add creator info
  const interviewData = {
    ...data,
    createdById: session.user.id,
    interviewers: {
      connect: data.interviewerIds?.map((id: string) => ({ id })) || [
        { id: session.user.id },
      ],
    },
  };

  // Remove interviewerIds as we've processed it
  delete interviewData.interviewerIds;

  const interview = await createInterviewData(interviewData);

  revalidatePath('/dashboard/interviews');
  revalidatePath(`/dashboard/candidates/${data.candidateId}`);
  return interview;
}

export async function updateInterview(id: string, data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Format dates if they are provided as strings
  if (typeof data.startTime === 'string') {
    data.startTime = new Date(data.startTime);
  }

  if (typeof data.endTime === 'string') {
    data.endTime = new Date(data.endTime);
  }

  // Process interviewers if provided
  const updateData: any = { ...data };

  if (data.interviewerIds) {
    updateData.interviewers = {
      set: data.interviewerIds.map((id: string) => ({ id })),
    };
    delete updateData.interviewerIds;
  }

  const interview = await updateInterviewData(id, updateData);

  revalidatePath(`/dashboard/interviews/${id}`);
  revalidatePath('/dashboard/interviews');
  if (interview.candidateId) {
    revalidatePath(`/dashboard/candidates/${interview.candidateId}`);
  }
  return interview;
}

export async function deleteInterview(id: string, candidateId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await deleteInterviewData(id);

  revalidatePath('/dashboard/interviews');
  revalidatePath(`/dashboard/candidates/${candidateId}`);
  return true;
}

export async function updateInterviewStatus(id: string, status: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const interview = await updateInterviewData(id, { status });

  revalidatePath(`/dashboard/interviews/${id}`);
  revalidatePath('/dashboard/interviews');
  if (interview.candidateId) {
    revalidatePath(`/dashboard/candidates/${interview.candidateId}`);
  }
  return interview;
}

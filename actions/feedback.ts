// lib/actions/feedback.ts

'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import {
  createFeedback as createFeedbackData,
  updateFeedback as updateFeedbackData,
  deleteFeedback as deleteFeedbackData,
} from '@/data/feedback';

export async function createFeedback(data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Ensure the current user is the interviewer
  const feedbackData = {
    ...data,
    interviewerId: session.user.id,
  };

  const feedback = await createFeedbackData(feedbackData);

  revalidatePath(`/dashboard/interviews/${feedback.interviewId}`);
  revalidatePath(`/dashboard/candidates/${feedback.candidateId}`);
  revalidatePath('/dashboard/feedback');
  return feedback;
}

export async function updateFeedback(id: string, data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Ensure the current user is the interviewer
  const feedback = await updateFeedbackData(id, data);

  revalidatePath(`/dashboard/interviews/${feedback.interviewId}`);
  revalidatePath(`/dashboard/candidates/${feedback.candidateId}`);
  revalidatePath(`/dashboard/feedback/${id}`);
  revalidatePath('/dashboard/feedback');
  return feedback;
}

export async function deleteFeedback(
  id: string,
  interviewId: string,
  candidateId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await deleteFeedbackData(id);

  revalidatePath(`/dashboard/interviews/${interviewId}`);
  revalidatePath(`/dashboard/candidates/${candidateId}`);
  revalidatePath('/dashboard/feedback');
  return true;
}

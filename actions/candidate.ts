// lib/actions/candidate.ts

'use server';

import { auth } from '@/auth';
import {
  createCandidate as createCandidateData,
  deleteCandidate as deleteCandidateData,
  updateCandidate as updateCandidateData,
} from '@/data/candidate';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createCandidate(data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Add the user who created the candidate
  const { notes, ...candidateData } = data; // Exclude notes from candidateData
  candidateData.createdById = session.user.id;

  // Create the candidate
  const candidate = await createCandidateData(candidateData);
  console.log('🚀 ~ createCandidate ~ candidate:', candidate);
  console.log(data);

  // Add note if provided
  if (notes) {
    await db.note.create({
      data: {
        content: notes,
        candidateId: candidate.id,
      },
    });
  }

  revalidatePath('/dashboard/candidates');
  return candidate;
}

export async function updateCandidate(id: string, data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Remove notes from the update data
  const { notes, ...updateData } = data;

  // Update the candidate
  const candidate = await updateCandidateData(id, updateData);

  // Add note if provided
  if (notes) {
    await db.note.create({
      data: {
        content: notes,
        candidateId: id,
      },
    });
  }

  revalidatePath(`/dashboard/candidates/${id}`);
  revalidatePath('/dashboard/candidates');
  return candidate;
}

export async function deleteCandidate(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await deleteCandidateData(id);

  revalidatePath('/dashboard/candidates');
  return true;
}

export async function addCandidateNote(candidateId: string, content: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const note = await db.note.create({
    data: {
      content,
      candidateId,
    },
  });

  revalidatePath(`/dashboard/candidates/${candidateId}`);
  return note;
}

export async function updateCandidateStatus(id: string, status: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const candidate = await updateCandidateData(id, { status });

  revalidatePath(`/dashboard/candidates/${id}`);
  revalidatePath('/dashboard/candidates');
  return candidate;
}

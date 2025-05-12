// app/api/positions/route.ts

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { UserRole } from '@/lib/generated/prisma';

// Schema for position validation
const positionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  department: z.string().optional(),
  workflowId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const positions = await db.position.findMany({
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json(positions);
  } catch (error) {
    console.error('Failed to fetch positions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate request
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow ADMIN and MANAGER roles to create positions
    if (
      session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = positionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.format() },
        { status: 400 }
      );
    }

    // Create the position
    const position = await db.position.create({
      data: validation.data,
    });

    return NextResponse.json(position, { status: 201 });
  } catch (error) {
    console.error('Failed to create position:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

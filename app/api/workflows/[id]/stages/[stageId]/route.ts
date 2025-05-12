// app/api/workflows/[workflowId]/stages/[stageId]/route.ts

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { UserRole } from '@/lib/generated/prisma';

// Schema for stage update validation
const stageUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional().nullable(),
});

interface RouteParams {
  params: {
    workflowId: string;
    stageId: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const stage = await db.stage.findUnique({
      where: {
        id: params.stageId,
        workflowId: params.workflowId,
      },
    });

    if (!stage) {
      return NextResponse.json({ error: 'Stage not found' }, { status: 404 });
    }

    return NextResponse.json(stage);
  } catch (error) {
    console.error('Failed to fetch stage:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    // Authenticate request
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow ADMIN roles to update stages
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = stageUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.format() },
        { status: 400 }
      );
    }

    // Check if stage exists
    const existingStage = await db.stage.findUnique({
      where: {
        id: params.stageId,
        workflowId: params.workflowId,
      },
    });

    if (!existingStage) {
      return NextResponse.json({ error: 'Stage not found' }, { status: 404 });
    }

    // Update the stage
    const stage = await db.stage.update({
      where: { id: params.stageId },
      data: validation.data,
    });

    return NextResponse.json(stage);
  } catch (error) {
    console.error('Failed to update stage:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Authenticate request
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow ADMIN roles to delete stages
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get the stage to be deleted
    const stage = await db.stage.findUnique({
      where: {
        id: params.stageId,
        workflowId: params.workflowId,
      },
      select: { order: true },
    });

    if (!stage) {
      return NextResponse.json({ error: 'Stage not found' }, { status: 404 });
    }

    // Delete the stage
    await db.stage.delete({
      where: { id: params.stageId },
    });

    // Reorder remaining stages
    await db.$executeRaw`
      UPDATE "Stage"
      SET "order" = "order" - 1
      WHERE "workflowId" = ${params.workflowId}
      AND "order" > ${stage.order}
    `;

    return NextResponse.json(
      { message: 'Stage deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete stage:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

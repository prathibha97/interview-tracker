// app/api/workflows/[id]/stages/route.ts

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { z } from 'zod';
import { UserRole } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

// Schema for stage validation
const stageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(),
});

// Schema for stage reordering
const reorderSchema = z.object({
  stageIds: z.array(z.string()),
});

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    // Check if workflow exists
    const workflow = await db.workflow.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    // Get all stages for the workflow
    const stages = await db.stage.findMany({
      where: { workflowId: params.id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(stages);
  } catch (error) {
    console.error('Failed to fetch stages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    // Authenticate request
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow ADMIN roles to create stages
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if workflow exists
    const workflow = await db.workflow.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();

    // Check if it's a reorder operation
    if ('stageIds' in body) {
      const validation = reorderSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { error: 'Validation error', details: validation.error.format() },
          { status: 400 }
        );
      }

      const { stageIds } = validation.data;

      // Validate that all stages belong to this workflow
      const stages = await db.stage.findMany({
        where: {
          id: { in: stageIds },
          workflowId: params.id,
        },
        select: { id: true },
      });

      if (stages.length !== stageIds.length) {
        return NextResponse.json(
          { error: 'One or more stages do not belong to this workflow' },
          { status: 400 }
        );
      }

      // Update the order of stages
      await db.$transaction(
        stageIds.map((stageId, index) =>
          db.stage.update({
            where: { id: stageId },
            data: { order: index },
          })
        )
      );

      // Get the updated stages
      const updatedStages = await db.stage.findMany({
        where: { workflowId: params.id },
        orderBy: { order: 'asc' },
      });

      return NextResponse.json(updatedStages);
    } else {
      // Regular stage creation
      const validation = stageSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { error: 'Validation error', details: validation.error.format() },
          { status: 400 }
        );
      }

      // Get the highest order in the workflow
      const highestOrderStage = await db.stage.findFirst({
        where: { workflowId: params.id },
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      // Set the order to one more than the highest order, or 0 if no stages exist
      const order = highestOrderStage ? highestOrderStage.order + 1 : 0;

      // Create the stage
      const stage = await db.stage.create({
        data: {
          ...validation.data,
          order,
          workflow: {
            connect: { id: params.id },
          },
        },
      });

      return NextResponse.json(stage, { status: 201 });
    }
  } catch (error) {
    console.error('Failed to create/reorder stages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

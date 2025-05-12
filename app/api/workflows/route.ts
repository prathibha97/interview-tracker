// app/api/workflows/route.ts

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { UserRole } from '@/lib/generated/prisma';

// Schema for workflow validation
const workflowSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  isDefault: z.boolean().optional().default(false),
  stages: z
    .array(
      z.object({
        name: z.string().min(1, 'Stage name is required'),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export async function GET() {
  try {
    const workflows = await db.workflow.findMany({
      include: {
        stages: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(workflows);
  } catch (error) {
    console.error('Failed to fetch workflows:', error);
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

    // Only allow ADMIN roles to create workflows
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = workflowSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { stages, ...workflowData } = validation.data;

    // If this is set as default, update any existing defaults
    if (workflowData.isDefault) {
      await db.workflow.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create the workflow with stages
    const workflow = await db.workflow.create({
      data: {
        ...workflowData,
        stages: {
          create:
            stages?.map((stage, index) => ({
              ...stage,
              order: index,
            })) || [],
        },
      },
      include: {
        stages: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    console.error('Failed to create workflow:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

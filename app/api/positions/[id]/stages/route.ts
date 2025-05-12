// app/api/positions/[id]/stages/route.ts

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    // Get the position with its workflow
    const position = await db.position.findUnique({
      where: { id: params.id },
      include: {
        workflow: {
          include: {
            stages: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!position) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      );
    }

    if (!position.workflow) {
      // If no workflow is associated, try to get the default workflow
      const defaultWorkflow = await db.workflow.findFirst({
        where: { isDefault: true },
        include: {
          stages: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });

      if (!defaultWorkflow) {
        return NextResponse.json([]);
      }

      return NextResponse.json(defaultWorkflow.stages);
    }

    return NextResponse.json(position.workflow.stages);
  } catch (error) {
    console.error('Failed to fetch stages for position:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

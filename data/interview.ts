// lib/data/interview.ts (additional function)

import { db } from "@/lib/db";

export async function getStagesForPosition(positionId: string) {
  try {
    // Get the position with its workflow
    const position = await db.position.findUnique({
      where: { id: positionId },
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

    if (!position?.workflow) {
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

      return defaultWorkflow?.stages || [];
    }

    return position.workflow.stages;
  } catch (error) {
    console.error('Failed to fetch stages for position:', error);
    return [];
  }
}

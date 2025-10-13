import db from "@/db";
import { executionPhase, workflowExecution } from "@/db/schema";
import { and, eq, asc } from "drizzle-orm";

export const joinWorkfowExec__executionPhase = async (
  executionId: string,
  userId: string
) => {
  const phases = await db
    .select()
    .from(workflowExecution)
    .where(
      and(
        eq(workflowExecution.id, executionId),
        eq(workflowExecution.userId, userId)
      )
    )
    .leftJoin(
      executionPhase,
      eq(executionPhase.workflowExecutionId, executionId)
    )
    .orderBy(asc(executionPhase.phaseNumber));

  return phases;
};

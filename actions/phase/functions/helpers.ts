import db from "@/db";
import { executionLogs, executionPhase, workflowExecution } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const joinWorkfowExec__executionPhase__executionLogs = async (phaseId: string, userId: string) => {
    return await db.select()
        .from(executionPhase)
        .fullJoin(workflowExecution, eq(executionPhase.workflowExecutionId, workflowExecution.id))
        .fullJoin(executionLogs, eq(executionPhase.id, executionLogs.workflowExecutionPhaseId))
        .where(and(eq(executionPhase.id, phaseId), eq(workflowExecution.userId, userId)))
}

export const getPhaseDetails = async (phaseId: string, userId: string) => {
    return await unstable_cache(
        joinWorkfowExec__executionPhase__executionLogs,
        [`w_phaseDetails-user-${userId}-${phaseId}`],
        {
            tags: [`w_phaseDetails-user-${userId}-${phaseId}`],
            revalidate: 15 * 60,
        }
    )(phaseId, userId);
}
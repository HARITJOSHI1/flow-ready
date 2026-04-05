import db from "@/db";
import { executionPhase, workflowExecution } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const joinWorkfowExec__executionPhase = async (phaseId: string, userId: string) => {
    return await db.select()
        .from(executionPhase)
        .innerJoin(workflowExecution, eq(executionPhase.workflowExecutionId, workflowExecution.id))
        .where(and(eq(executionPhase.id, phaseId), eq(workflowExecution.userId, userId)))
}

export const getPhaseDetails = async (phaseId: string, userId: string) => {
    return await unstable_cache(
        joinWorkfowExec__executionPhase,
        [`w_phaseDetails-user-${userId}-${phaseId}`],
        {
            tags: [`w_phaseDetails-user-${userId}-${phaseId}`],
            revalidate: 15 * 60,
        }
    )(phaseId, userId);
}
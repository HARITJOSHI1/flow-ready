import db from "@/db";
import { executionLogs, executionPhase, workflowExecution } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// No unstable_cache here — phase logs are written during execution, so any
// cache snapshot taken before log insertion will be stale. React Query in
// usePhaseDetails.ts (staleTime: 0) handles client-side freshness instead.
export const getPhaseDetails = async (phaseId: string, userId: string) => {
    return await db.select()
        .from(executionPhase)
        .fullJoin(workflowExecution, eq(executionPhase.workflowExecutionId, workflowExecution.id))
        .fullJoin(executionLogs, eq(executionPhase.id, executionLogs.workflowExecutionPhaseId))
        .where(and(eq(executionPhase.id, phaseId), eq(workflowExecution.userId, userId)));
}
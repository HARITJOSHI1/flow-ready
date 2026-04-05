import db from "@/db";
import { workflowExecution, workflow } from "@/db/schema";
import { eq } from "drizzle-orm";

export const initializeWorkflowExecution = async (executionId: string, workflowId: string) => {

  // *** cuz of large number of executions we are storing last run details in workflow table as well for quick access from saving time to query from a large table ***

  await db.update(workflowExecution)
    .set({
      status: "RUNNING",
      startedAt: new Date(),
    })
    .where(eq(workflowExecution.id, executionId));

  await db.update(workflow)
    .set({
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: "RUNNING",
    })
    .where(eq(workflow.id, workflowId));
}
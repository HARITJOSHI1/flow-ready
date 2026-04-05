import db from "@/db";
import { workflowExecution, workflow } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const finaliseExecution = async (executionId: string, workflowId: string, executionFailed: boolean, creditsConsumed: number) => {

  const finalStatus = executionFailed ? "FAILED" : "COMPLETED";

  await db.update(workflowExecution)
    .set({
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed
    })
    .where(eq(workflowExecution.id, executionId));


  /* Intuition before the fix for The Race Condition
  
  finaliseExecution()
   function updates the workflow table's lastRunStatus blindly by workflowId.
  
  If you have two concurrent executions (Run A and Run B) for the same workflow:
  
  Run A starts: workflow.lastRunId becomes idA, lastRunStatus becomes RUNNING.
  Run B starts: workflow.lastRunId becomes idB, lastRunStatus becomes RUNNING.
  Run B fails quickly: 
  
  finaliseExecution
   for Run B sets workflow.lastRunStatus to FAILED. Now the DB state is: lastRunId: idB, lastRunStatus: FAILED.
  Run A finishes later: 
  
  finaliseExecution
   for Run A sets workflow.lastRunStatus to COMPLETED.
  Result: In the workflow table, lastRunId is idB, but lastRunStatus is COMPLETED (which was Run A's result). This creates an inconsistent state where the "Last Run ID" and "Last Run Status" don't belong to the same execution.*/

  await db.update(workflow)
    .set({
      lastRunStatus: finalStatus, // only the latest execution will update this
    })
    .where(and(eq(workflow.id, workflowId), eq(workflow.lastRunId, executionId))).catch((err) => {
      // IGNORE; if the lastRunId is not equal to the current executionId, it means that the latest execution has already updated the lastRunStatus, so we don't need to update it
    });
}

import db from "@/db";
import { executionPhase, workflowExecution, workflow, ExecutionPhase } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { isErr, Ok, wait } from "@/lib/helpers/global";
import { AppNode } from "@/lib/types/nodes";
import { TaskType } from "@/lib/types/tasks";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type CreateExecutionPlanInDBProps = {
  workflowId: string;
  userId: string;
  executionPlan: WorkflowExecutionPlan;
};

export const createExecutionPlanInDB = async ({
  workflowId,
  userId,
  executionPlan,
}: CreateExecutionPlanInDBProps) => {
  const result = await db
    .insert(workflowExecution)
    .values({
      workflowId,
      userId,
      status: "PENDING",
      trigger: "MANUAL",
      startedAt: new Date(),
    })
    .returning();

  if (result.length === 0)
    throw ApiError.notFound(
      "INTERNAL_SERVER_ERROR",
      404,
      "No id provided",
      false,
      {
        environment: process.env.NODE_ENV,
        functionName: "runWorkflow()",
      }
    );

  const phases = await db
    .insert(executionPhase)
    .values(
      executionPlan.flatMap((phase) =>
        phase.nodes.flatMap((node) => {
          const task = TaskRegistry.getTask(node.data.type as TaskType);
          if (isErr(task)) return [];

          const name = task.data.label;

          // Explicitly type status as the allowed literal type
          return {
            userId,
            workflowExecutionId: result[0].id,
            status: "CREATED" as const,
            node: JSON.stringify(node),
            phaseNumber: phase.phase,
            name,
          };
        })
      )
    )
    .returning();

  if (phases.length === 0)
    throw ApiError.notFound(
      "NO_WORKFLOWS",
      404,
      "Failed to create execution phase in db",
      false,
      {
        environment: process.env.NODE_ENV,
        functionName: "runWorkflow()",
      }
    );

  return {
    id: result[0].id,
    phases,
  };
};


export const executeWorkflow = async (executionId: string) => {
  const rows = await db
    .select()
    .from(workflowExecution)
    .innerJoin(
      executionPhase,
      eq(executionPhase.workflowExecutionId, executionId)
    )
    .where(eq(workflowExecution.id, executionId))
    .innerJoin(workflow, eq(workflow.id, workflowExecution.workflowId));

  if (rows.length === 0) {
    throw ApiError.notFound(
      "NOT_FOUND",
      404,
      "No execution found",
      false,
      {
        environment: process.env.NODE_ENV,
        functionName: "executeWorkflow()",
      }
    );
  }

  const execution = {
    workflow: rows[0].workflow,
    workflowExecution: rows[0].workflow_execution,
    phases: rows.map((r) => r.execution_phase),
  };

  // 1. Setup execution env
  const environment = {
    phases: {}
  }

  // 2. Initialize workflow execution to RUNNING
  await initializeWorkflowExecution(executionId, execution.workflow.id);


  // 3. Initialize all phases status
  await initializeExecutionPhaseStatus(execution.phases);

  let executionFailed = false;
  let creditsConsumed = 0;
  for (const phase of execution.phases) {
    // Execute each phase
    const phaseExecution = await executePhase(phase);

    if (!phaseExecution) {
      executionFailed = true;
      break;
    }
  }

  // Finalise the execution 
  await finaliseExecution(executionId, execution.workflow.id, executionFailed, creditsConsumed);

  // Cleanup environment
  revalidatePath("/workflows/runs");
}


const initializeWorkflowExecution = async (executionId: string, workflowId: string) => {

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


const initializeExecutionPhaseStatus = async (phases: ExecutionPhase[]) => {

  await db.update(executionPhase).set(
    {
      status: "PENDING",
    }
  ).where(inArray(executionPhase.id, phases.map((phase) => phase.id)));
}


const finaliseExecution = async (executionId: string, workflowId: string, executionFailed: boolean, creditsConsumed: number) => {

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


const executePhase = async (phase: ExecutionPhase) => {

  const startedAt = new Date();
  const node = JSON.parse(phase.node!) as AppNode;

  // update phase status to RUNNING
  await db.update(executionPhase)
    .set({
      status: "RUNNING",
      startedAt,
    })
    .where(eq(executionPhase.id, phase.id));

  const creditsRequired = TaskRegistry.getTask(node.data.type as TaskType);
  if (isErr(creditsRequired)) return;

  console.log(`Executing phase ${phase.name} with node ${node.data.type} with credits ${creditsRequired.data.credits}`);


  // Decrement user balance (with required credits)

  await wait(2000);
  const success = Math.random() < 0.7;

  await finalisePhase(phase.id, success);
 
  return success;
}


const finalisePhase = async (phaseId: string, success: boolean) => {
  const finalStatus = success ? "COMPLETED" : "FAILED";

  await db.update(executionPhase)
    .set({
      status: finalStatus,
      completedAt: new Date(),
    })
    .where(eq(executionPhase.id, phaseId));
}

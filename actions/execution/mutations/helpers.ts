import db from "@/db";
import { executionPhase, workflowExecution, workflow } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { isErr } from "@/lib/helpers/global";
import { TaskType } from "@/lib/types/tasks";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";
import { eq } from "drizzle-orm";
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

  // 3. Initialize all phases status

  let executionFailed = false;
  for (const phase of execution.phases) {
    // Execute each phase
  }

  // Finalise the execution 

  // Cleanup environment
  revalidatePath("/workflows/runs");
}
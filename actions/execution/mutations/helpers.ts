import db from "@/db";
import { executionPhase, workflowExecution } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { isErr } from "@/lib/helpers";
import { TaskType } from "@/lib/types/tasks";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";

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

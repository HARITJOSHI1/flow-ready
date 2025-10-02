import db from "@/db";
import { executionPhase, workflowExecution } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { ActionError } from "@/lib/types/errors/base.action.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ERROR_TYPES } from "@/lib/types/errors/server.err";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/lib/types/tasks";
import { isErr } from "@/lib/helpers";

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
    throw ApiError.internal<ActionError>(
      {
        status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
        type: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        message: "Failed to create execution plan in db",
      },
      undefined,
      false,
      false
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
    throw ApiError.internal<ActionError>(
      {
        status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
        type: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        message: "Failed to create execution phases in db",
      },
      undefined,
      false,
      false
    );

  return {
    id: result[0].id,
    phases,
  };
};

"use server";

import { base } from "../../base";
import { createServerActionOutputSchema, isErr } from "@/lib/helpers";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { z } from "zod";
import { RUN_WORKFLOW_ACTION_RESULT_SCHEMA } from "../../workflows/mutations/types";
import { ActionError } from "@/lib/types/errors/base.action.err";
import ApiError from "@/lib/classes/Error/ApiError";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { getWorkflowsFromDB } from "../../workflows/queries/helpers";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";
import { FlowToExecutionPlan } from "@/lib/executionPlan";
import { createExecutionPlanInDB } from "./helpers";

export const runWorkflow = base
  .createServerAction()
  .input(
    z.object({
      workflowId: z.string(),
      flowDefination: z.string().optional(),
    })
  )
  .output(
    createServerActionOutputSchema(
      RUN_WORKFLOW_ACTION_RESULT_SCHEMA,
      ERROR_SCHEMA
    )
  )
  .handler(async ({ input, ctx }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId, flowDefination } = input;

    if (!workflowId)
      throw ApiError.internal<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_WORKFLOWS,
          code: 404,
          message: "Cannot use a non-workflow Id to retrieve workflow",
        },
        undefined,
        false,
        false
      );

    const workflow = await getWorkflowsFromDB(
      ctx.result.userId,
      undefined,
      workflowId
    );

    if (!workflow)
      throw ApiError.notFound<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_WORKFLOWS,
          code: 404,
          message: "No workflow found. Please create a new workflow",
        },
        undefined,
        false,
        false
      );

    let executionPlan: WorkflowExecutionPlan;
    if (!flowDefination)
      throw ApiError.notFound<ActionError>(
        {
          type: ERROR_TYPES.ERROR,
          code: 400,
          message:
            "Flow defination must be provided either at execution or after publish",
        },
        undefined,
        false,
        false
      );

    const flow = JSON.parse(flowDefination);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (isErr(result)) {
      console.error(result.error);

      throw ApiError.internal<ActionError>(
        {
          status: RESPONSE_STATUS.BAD_REQUEST,
          type: result.error.type,
          code: 400,
          message: result.error.message,
        },
        undefined,
        false,
        false
      );
    }

    if (!result.data.executionPlan)
      throw ApiError.internal<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_EXECUTION_PLAN,
          code: 404,
          message: "No execution plan is found",
        },
        undefined,
        false,
        false
      );

    executionPlan = result.data.executionPlan;

    const execution = await createExecutionPlanInDB({
      workflowId,
      userId: ctx.result.userId,
      executionPlan,
    });

    return {
      resolved: "success",
      result: {
        redirect_url: `/workflows/runs/${workflowId}/${execution.id}`,
      },
    };
  });

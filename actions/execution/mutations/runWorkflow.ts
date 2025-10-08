"use server";

import ApiError from "@/lib/classes/Error/ApiError";
import { FlowToExecutionPlan } from "@/lib/executionPlan";
import { createServerActionOutputSchema, isErr } from "@/lib/helpers";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { z } from "zod";
import { base } from "../../base";
import { getWorkflowsFromDB } from "../../workflows/queries/helpers";
import { createExecutionPlanInDB } from "./helpers";
import { RUN_WORKFLOW_ACTION_RESULT_SCHEMA } from "./schema";

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
      ERROR_SCHEMA_v2
    )
  )
  .handler(async ({ input, ctx }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId, flowDefination } = input;

    if (!workflowId)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "Cannot use a non-workflow Id to retrieve workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "runWorkflow()",
        }
      );

    const workflow = await getWorkflowsFromDB(
      ctx.result.userId,
      undefined,
      workflowId
    );

    if (!workflow)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "No workflow found. Please create a new workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "runWorkflow()",
        }
      );

    let executionPlan: WorkflowExecutionPlan;
    if (!flowDefination)
      throw ApiError.notFound(
        "INTERNAL_ERROR",
        400,
        "Flow defination must be provided either at execution or after publish",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "runWorkflow()",
        }
      );

    const flow = JSON.parse(flowDefination);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (isErr(result)) {
      console.error(result.error);

      throw ApiError.internal(
        result.error.type as any,
        400,
        result.error.message,
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "runWorkflow()",
        }
      );
    }

    if (!result.data.executionPlan)
      throw ApiError.notFound(
        "NO_EXECUTION_PLAN",
        404,
        "No execution plan is found",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "runWorkflow()",
        }
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
        redirect_url: `/workflow/runs/${workflowId}/${execution.id}`,
      },
    };
  });

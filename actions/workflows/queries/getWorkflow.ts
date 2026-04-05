"use server";

import { base } from "@/actions/base";
import { Workflow } from "@/db/schema";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import z from "zod";
import { getWorkflowsFromDB } from "../functions/getWorkflowsFromDB";
import { GET_WORKFLOW_ACTION_RESULT_SCHEMA } from "./schema";
import ApiError from "@/lib/classes/Error/ApiError";

export const getWorkflow = base
  .createServerAction()
  .input(
    z.object({
      workflowId: z.string(),
      selectable: z
        .object({
          id: z.boolean().optional(),
          name: z.boolean().optional(),
          description: z.boolean().optional(),
          userId: z.boolean().optional(),
          defination: z.boolean().optional(),
          status: z.boolean().optional(),
          createdAt: z.boolean().optional(),
          updatedAt: z.boolean().optional(),
        })
        .partial()
        .optional(),
    })
  )
  .output(
    createServerActionOutputSchema(
      GET_WORKFLOW_ACTION_RESULT_SCHEMA,
      ERROR_SCHEMA_v2
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId, selectable } = input;
    const { userId } = ctx.result;

    const workflows = await getWorkflowsFromDB(
      userId,
      selectable as Record<keyof Workflow, boolean>,
      workflowId
    );

    if (!workflows.length)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "No workflows found. Please create a new workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "getWorkflow()",
        }
      );

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        workflow: workflows.pop()!,
      },
    };
  });

"use server";

import { Workflow } from "@/db/schema";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { base } from "../../base";
import { getWorkflowsFromDB } from "./helpers";
import {
  GET_WORKFLOW_ACTION_RESULT_SCHEMA,
  GET_WORKFLOWS_ACTION_RESULT_SCHEMA,
} from "./types";
import ApiError from "@/lib/classes/Error/ApiError";
import { ActionError } from "@/lib/types/errors/base.action.err";

export const getUserWorkflows = base
  .createServerAction()
  .input(
    z.object({
      selectable: z
        .object({
          id: z.boolean().optional(),
          name: z.boolean().optional(),
          description: z.boolean().optional(),
          defination: z.boolean().optional(),
          status: z.boolean().optional(),
          createdAt: z.boolean().optional(),
          updatedAt: z.boolean().optional(),
        })
        .optional(),
    })
  )
  .output(
    createServerActionOutputSchema(
      GET_WORKFLOWS_ACTION_RESULT_SCHEMA,
      ERROR_SCHEMA
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };
    const { userId } = ctx.result;
    const { selectable } = input;

    const workflows = await unstable_cache(
      getWorkflowsFromDB,
      [`workflows-user-${userId}`],
      {
        tags: [`workflows-user-${userId}`],
        revalidate: 15 * 60,
      }
    )(userId, selectable as Record<keyof Workflow, boolean>);

    if (!workflows)
      throw ApiError.notFound<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_WORKFLOWS,
          code: 404,
          message: "No workflows found. Please create a new workflow",
        },
        undefined,
        false,
        false
      );

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        workflows: workflows,
      },
    };
  });


  
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
      ERROR_SCHEMA
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
      throw ApiError.notFound<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_WORKFLOWS,
          code: 404,
          message: "No workflows found. Please create a new workflow",
        },
        undefined,
        false,
        false
      );

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        workflow: workflows.pop()!,
      },
    };
  });

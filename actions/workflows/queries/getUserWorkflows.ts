"use server";

import { Workflow } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { base } from "../../base";
import { getWorkflowsFromDB } from "../functions/getWorkflowsFromDB";
import {
  GET_WORKFLOWS_ACTION_RESULT_SCHEMA
} from "./schema";

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
      ERROR_SCHEMA_v2
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
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "No workflows found. Please create a new workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "getUserWorkflows()",
        }
      );

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        workflows: workflows,
      },
    };
  });

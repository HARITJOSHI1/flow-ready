"use server";

import db from "@/db";
import { workflow } from "@/db/schema";
import { createServerActionOutputSchema } from "@/lib/helpers";
import ApiError from "@/lib/classes/Error/ApiError";
import { ActionError } from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA } from "@/lib/types/errors/server.err";
import { ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { base } from "../../base";
import { DELETE_WORKFLOW_ACTION_SCHEMA } from "./types";

export const deleteWorkflow = base
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
    })
  )
  .output(
    createServerActionOutputSchema(DELETE_WORKFLOW_ACTION_SCHEMA, ERROR_SCHEMA)
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { userId } = ctx.result;

    const result = await db
      .delete(workflow)
      .where(and(eq(workflow.name, input.name), eq(workflow.userId, userId)))
      .returning();

    if (!result.length) {
      throw ApiError.notFound<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NOT_FOUND,
          message: "Workflow not found",
          code: 404,
        },
        undefined,
        false
      );
    }

    revalidateTag(`workflows-user-${userId}`);

    return {
      resolved: "success",
      result: {
        message: "Workflow deleted successfully",
      },
    };
  });

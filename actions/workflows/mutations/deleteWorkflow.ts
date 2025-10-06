"use server";

import db from "@/db";
import { workflow } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
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
    createServerActionOutputSchema(DELETE_WORKFLOW_ACTION_SCHEMA, ERROR_SCHEMA_v2)
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
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "Workflow not found",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "deleteWorkflow()",
        }
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

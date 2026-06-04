"use server";

import db from "@/db";
import { workflow } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema, isErr } from "@/lib/helpers/global";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { base } from "../../base";
import { parseExpressions } from "../functions/parseExpressions";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { UPDATE_WORKFLOW_CRON_SCHEMA } from "./schema";

export const updateWorkflowCron = base
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      cron: z. string(),
    }),
  )
  .output(createServerActionOutputSchema(UPDATE_WORKFLOW_CRON_SCHEMA, ERROR_SCHEMA_v2))
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { userId } = ctx.result;

    const result = parseExpressions(input.cron);

    if (isErr(result))
      throw ApiError.internal(
        "INTERNAL_ERROR",
        500,
        "Invalid cron expression",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "updateWorkflowCron()",
        },
      );

    const updatedWorkflow = await db
      .update(workflow)
      .set({ cron: input.cron, nextRunAt: result.data.next().toDate() })
      .where(and(eq(workflow.id, input.id), eq(workflow.userId, userId)))
      .returning();

    revalidateTag(`workflows-user-${userId}`);
    revalidatePath("/workflows");

    return {
      resolved: "success",
      result: {
        workflow: updatedWorkflow[0],
      },
    };
  });

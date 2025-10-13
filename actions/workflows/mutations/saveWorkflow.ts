"use server";

import { saveWorkflowSchema } from "@/components/forms/workflows/schema";
import db from "@/db";
import { workflow } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { WORKFLOW_STATUS } from "@/lib/workflow/type";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { base } from "../../base";
import { SAVE_WORKFLOW_ACTION_SCHEMA } from "./schema";

export const saveWorkflow = base
  .createServerAction()
  .input(saveWorkflowSchema)
  .output(
    createServerActionOutputSchema(SAVE_WORKFLOW_ACTION_SCHEMA, ERROR_SCHEMA_v2)
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId, defination } = input;
    const userId = ctx.result.userId;

    const w = (
      await db.select().from(workflow).where(eq(workflow.id, workflowId))
    ).pop();

    if (!w)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "Workflow not found",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "saveWorkflow()",
        }
      );
    else if (w.status !== WORKFLOW_STATUS.DRAFT)
      throw ApiError.internal(
        "WORKFLOW_NOT_IN_DRAFT_ERROR",
        400,
        "Workflow must be in draft status to save",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "saveWorkflow()",
        }
      );

    await db
      .update(workflow)
      .set({ defination })
      .where(eq(workflow.id, workflowId))
      .returning();

    // Revalidate the cache as workflow got updated
    revalidateTag(`workflows-user-${userId}`);

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        message: "Workflow saved successfully",
      },
    };
  });

"use server";

import { saveWorkflowSchema } from "@/components/forms/workflows/schema";
import db from "@/db";
import { workflow } from "@/db/schema";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { base } from "../../base";
import { SAVE_WORKFLOW_ACTION_SCHEMA } from "./types";
import ApiError from "@/lib/classes/Error/ApiError";
import { ActionError } from "@/lib/types/errors/base.action.err";
import { WORKFLOW_STATUS } from "@/lib/workflow/type";

export const saveWorkflow = base
  .createServerAction()
  .input(saveWorkflowSchema)
  .output(
    createServerActionOutputSchema(SAVE_WORKFLOW_ACTION_SCHEMA, ERROR_SCHEMA)
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
      throw ApiError.notFound<ActionError>(
        {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_WORKFLOWS,
          message: "Workflow not found",
          code: 404,
        },
        undefined,
        false,
        false
      );
    else if (w.status !== WORKFLOW_STATUS.DRAFT)
      throw ApiError.internal(
        {
          resolved: "error",
          error: {
            status: RESPONSE_STATUS.BAD_REQUEST,
            type: ERROR_TYPES.WORKFLOW_NOT_IN_DRAFT_ERROR,
            message: "Workflow must be in draft status to save",
            code: 400,
          },
        },
        undefined,
        false,
        false
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

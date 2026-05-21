"use server";

import db from "@/db";
import { workflow as workflowTable } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { base } from "../../base";
import { getWorkflowsFromDB } from "../../workflows/functions/getWorkflowsFromDB";

export const unpublishWorkflow = base
  .createServerAction()
  .input(
    z.object({
      workflowId: z.string(),
      flowDefination: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId, flowDefination } = input;
    const { userId } = ctx.result;

    if (!workflowId)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "Cannot use a non-workflow Id to retrieve workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "unpublishWorkflow()",
        },
      );

    const [workflow] = await getWorkflowsFromDB(
      ctx.result.userId,
      undefined,
      workflowId,
    );

    if (!workflow)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "No workflow found. Please create a new workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "unpublishWorkflow()",
        },
      );

    if (workflow.status !== "PUBLISHED")
      throw ApiError.internal(
        "INTERNAL_ERROR",
        500,
        "Workflow is not a published workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "unpublishWorkflow()",
        },
      );

    await db
      .update(workflowTable)
      .set({
        status: "DRAFT",
        executionPlan: null,
        creditsCost: 0,
      })
      .where(
        and(
          eq(workflowTable.id, workflowId),
          eq(workflowTable.userId, ctx.result.userId),
        ),
      );

    revalidateTag(`workflows-user-${userId}`);
    revalidatePath(`/workflow/editor/${workflowId}`);
  });

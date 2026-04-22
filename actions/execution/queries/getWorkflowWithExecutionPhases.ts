"use server";

import { base } from "@/actions/base";
import db from "@/db";
import { WorkflowExecution, workflowExecution } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { and, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { z } from "zod";

export const getWorkflowExecutions = base
  .createServerAction()
  .input(z.object({ workflowId: z.string() }))
  .output(
    createServerActionOutputSchema(
      z.object({
        workflow_execution: z.custom<WorkflowExecution[]>(),
      }),
      ERROR_SCHEMA_v2
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId } = input;
    const { userId } = ctx.result;

    const result = await unstable_cache(async () => {
      return await db.select().from(workflowExecution)
        .where(
          and(eq(workflowExecution.workflowId, workflowId),
            eq(workflowExecution.userId, userId)))
        .orderBy(
          desc(workflowExecution.createdAt))

    }, [workflowId, userId], { tags: [`execution-${workflowId}-${userId}`] })()


    return {
      resolved: "success",
      result: {
        workflow_execution: result
      },
    };
  });

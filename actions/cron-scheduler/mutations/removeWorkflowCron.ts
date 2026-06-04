"use server";

import db from "@/db";
import { workflow } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { base } from "../../base";

export const removeWorkflowCron = base
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { userId } = ctx.result;

    await db
      .update(workflow)
      .set({ cron: null, nextRunAt: null })
      .where(and(eq(workflow.id, input.id), eq(workflow.userId, userId)))
      .returning();

    revalidateTag(`workflows-user-${userId}`);
    revalidatePath("/workflows");
  });

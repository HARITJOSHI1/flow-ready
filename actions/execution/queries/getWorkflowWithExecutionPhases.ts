"use server";

import { base } from "@/actions/base";
import db from "@/db";
import { executionPhase } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { WORKFLOW_EXEC_PHASES_ACTION_RESULT_SCHEMA } from "./types";

export const getWorkflowWithExecutionPhases = base
  .createServerAction()
  .input(z.object({ executionId: z.string() }))
  .output(
    createServerActionOutputSchema(
      WORKFLOW_EXEC_PHASES_ACTION_RESULT_SCHEMA,
      ERROR_SCHEMA_v2
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { executionId } = input;

    const phases = await db
      .select()
      .from(executionPhase)
      .where(eq(executionPhase.id, executionId))
      .orderBy(asc(executionPhase.phaseNumber));

    if (!phases)
      throw ApiError.notFound(
        "NOT_FOUND",
        404,
        "There are no execution phases. Please execute a workflow.",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "getWorkflowWithExecutionPhases()",
        }
      );

    return {
      resolved: "success",
      result: {
        phases,
      },
    };
  });

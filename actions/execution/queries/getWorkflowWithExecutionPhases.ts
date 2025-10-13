"use server";

import { base } from "@/actions/base";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { joinWorkfowExec__executionPhase } from "./helpers";
import { WORKFLOW_EXEC_PHASES_ACTION_RESULT_SCHEMA } from "./schema";

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
    const { userId } = ctx.result;

    const phases = await unstable_cache(
      joinWorkfowExec__executionPhase,
      [`w_execution-user-${userId}`],
      {
        tags: [`w_execution-user-${userId}`],
        revalidate: 15 * 60,
      }
    )(executionId, userId);

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
        workflow_execution: phases[0].workflow_execution,
        phases: phases.map((p) => p.execution_phase!),
      },
    };
  });

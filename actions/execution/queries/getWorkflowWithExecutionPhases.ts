"use server";

import { base } from "@/actions/base";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { z } from "zod";
import { joinWorkfowExec__executionPhase } from "../functions/joinWorkfowExec__executionPhase";
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

    // this query is polled live during execution
    const phases = await joinWorkfowExec__executionPhase(executionId, userId);

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

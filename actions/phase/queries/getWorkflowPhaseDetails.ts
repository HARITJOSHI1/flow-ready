"use server";

import { base } from "@/actions/base";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { z } from "zod";
import { getPhaseDetails } from "@/actions/phase/functions/helpers";
import { WORKFLOW_EXEC_PHASE_DETAILS_ACTION_RESULT_SCHEMA } from "./schema";


export const getWorkflowPhaseDetails = base
    .createServerAction()
    .input(z.object({ phaseId: z.string() }))
    .output(
        createServerActionOutputSchema(
            WORKFLOW_EXEC_PHASE_DETAILS_ACTION_RESULT_SCHEMA,
            ERROR_SCHEMA_v2
        )
    )
    .handler(async ({ ctx, input }) => {
        if (ctx.resolved === "error")
            return { resolved: "error", error: ctx.error };

        const { phaseId } = input;
        const { userId } = ctx.result;

        const result = await getPhaseDetails(phaseId, userId);

        if (!result)
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
                phase: result[0].execution_phase!,
                logs: result.map((r) => r.execution_logs!)
            },
        };
    });

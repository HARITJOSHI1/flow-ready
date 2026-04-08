import { ExecutionLog, ExecutionPhase } from "@/db/schema";
import { z } from "zod";

export const WORKFLOW_EXEC_PHASE_DETAILS_ACTION_RESULT_SCHEMA = z.object({
    phase: z.custom<ExecutionPhase>(),
    logs: z.custom<ExecutionLog[]>()
});

export type WORKFLOW_EXEC_PHASE_DETAILS_ACTION_RESULT = z.infer<
    typeof WORKFLOW_EXEC_PHASE_DETAILS_ACTION_RESULT_SCHEMA
>;

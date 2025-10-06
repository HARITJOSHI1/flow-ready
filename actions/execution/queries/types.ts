import { ExecutionPhase } from "@/db/schema";
import { z } from "zod";

export const WORKFLOW_EXEC_PHASES_ACTION_RESULT_SCHEMA = z.object({
  phases: z.custom<ExecutionPhase[]>(),
});

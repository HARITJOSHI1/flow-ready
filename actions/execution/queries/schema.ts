import { ExecutionPhase, WorkflowExecution } from "@/db/schema";
import { z } from "zod";

export const WORKFLOW_EXEC_PHASES_ACTION_RESULT_SCHEMA = z.object({
  workflow_execution: z.custom<WorkflowExecution>(),
  phases: z.custom<ExecutionPhase[]>(),
});

export type WORKFLOW_EXEC_PHASES_ACTION_RESULT = z.infer<
  typeof WORKFLOW_EXEC_PHASES_ACTION_RESULT_SCHEMA
>;

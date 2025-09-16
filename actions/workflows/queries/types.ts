import { Workflow } from "@/db/schema";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { z } from "zod";

export const GET_WORKFLOWS_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  workflows: z.array(z.custom<Workflow>()),
});

export const GET_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  workflow: z.custom<Workflow>(),
});

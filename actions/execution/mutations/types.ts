import { z } from "zod";

export const RUN_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  redirect_url: z.string(),
});

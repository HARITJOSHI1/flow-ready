import { z } from "zod";

export const SAVE_WORKFLOW_ACTION_SCHEMA = z.object({
    message: z.string(),
  });
  
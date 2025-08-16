import { z } from "zod";

export const DELETE_WORKFLOW_ACTION_SCHEMA = z.object({
    message: z.string(),
  });
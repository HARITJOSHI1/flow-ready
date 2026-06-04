import { Workflow } from "@/db/schema";
import { z } from "zod";

export const UPDATE_WORKFLOW_CRON_SCHEMA = z.object({
  workflow: z.custom<Workflow>(),
});

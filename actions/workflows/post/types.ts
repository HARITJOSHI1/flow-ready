import { RESPONSE_STATUS } from "@/lib/types/server";
import { z } from "zod";

export const CREATE_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  message: z.string(),
  redirect_url: z.string(),
});

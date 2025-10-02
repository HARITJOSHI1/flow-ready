import { z } from "zod";
import { RESPONSE_STATUS } from "@/lib/types/server";

export const DELETE_WORKFLOW_ACTION_SCHEMA = z.object({
  message: z.string(),
});

export const CREATE_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  message: z.string(),
  redirect_url: z.string(),
});

export const SAVE_WORKFLOW_ACTION_SCHEMA = z.object({
  message: z.string(),
});

export const RUN_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  redirect_url: z.string(),
});

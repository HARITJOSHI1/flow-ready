import { RESPONSE_STATUS } from ".";
import { z } from "zod";


export enum ERROR_TYPES {
  AUTH_CHECK_ERROR = "AUTH_CHECK_ERROR",
  NO_WORKFLOWS_ERROR = "NO_WORKFLOWS",
  CREATE_WORKFLOW_ERROR = "CREATE_WORKFLOW_ERROR",
}

export const SERVER_ACTION_ERROR_SCHEMA = z.object({
  type: z.nativeEnum(ERROR_TYPES),
  status: z.nativeEnum(RESPONSE_STATUS),
  code: z.number(),
  message: z.string(),
  shouldLog: z.boolean().optional(),
});

export type SERVER_ACTION_ERROR = z.infer<typeof SERVER_ACTION_ERROR_SCHEMA>;

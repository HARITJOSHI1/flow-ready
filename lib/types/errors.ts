import { RESPONSE_STATUS } from "./server";
import { z } from "zod";

export enum ERROR_TYPES {
  AUTH_CHECK_ERROR = "AUTH_CHECK_ERROR",
  NO_WORKFLOWS_ERROR = "NO_WORKFLOWS",
  CREATE_WORKFLOW_ERROR = "CREATE_WORKFLOW_ERROR",
  TASK_NOT_FOUND_ERROR = "TASK_NOT_FOUND_ERROR",
}

export const ERROR_SCHEMA = z.object({
  type: z.nativeEnum(ERROR_TYPES),
  status: z.nativeEnum(RESPONSE_STATUS).optional(),
  code: z.number().optional(),
  message: z.string(),
  shouldLog: z.boolean().optional(),
});

export type TError = z.infer<typeof ERROR_SCHEMA>;

export type Result<T, E> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

export type AsyncResult<T, E = TError> = Promise<Result<T, E>>;

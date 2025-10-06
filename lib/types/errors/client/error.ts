import { z } from "zod";
import { ActionError } from "../server/base";
import { extraDetailsSchema } from "@/schemas/errors";

export enum CLIENT_ERROR_TYPES {
  INPUT_PARSE_ERROR = "INPUT_PARSE_ERROR",
  OUTPUT_PARSE_ERROR = "OUTPUT_PARSE_ERROR",
  REACT_CONTEXT_ERROR = "HOOK_USED_IN_WRONG_FILE",
  NO_ENTRY_POINT = "ENTRY_POINT_MISSING",
  INVALID_INPUTS = "INVALID_WORKFLOW:INPUT",
  NO_WORKFLOWS = "NO_WORKFLOWS", 
  CREATE_WORKFLOW_ERROR = "CREATE_WORKFLOW_ERROR",
  TASK_NOT_FOUND_ERROR = "TASK_NOT_FOUND",
  WORKFLOW_NOT_IN_DRAFT_ERROR = "WORKFLOW_STATUS_NOT_DRAFT",
  NO_EXECUTION_PLAN = "NO_EXECUTION_PLAN_AVAILABLE",
}

export type ErrorDetails = z.infer<typeof extraDetailsSchema>

export type Result<T, E> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

export type AsyncResult<T, E = ActionError> = Promise<Result<T, E>>;
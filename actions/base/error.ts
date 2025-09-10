import ApiError from "@/lib/classes/Error/ApiError";
import {
  ActionError,
  BaseErrReturnType,
} from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA } from "@/lib/types/errors/server.err";
import { ZodError } from "zod";
import { ZSAError } from "zsa";
import { handleApiError } from "./handlers/api.err";
import { handleUnknownError } from "./handlers/unknown.err";
import { handleZodError } from "./handlers/zod.err";
import { handleZSAError } from "./handlers/zsa.err";
import UnknownError from "@/lib/classes/Error/UnknownError";

export const handleErrors = (
  error: unknown
): BaseErrReturnType<typeof ERROR_SCHEMA> => {
  
  UnknownError.initialize();


  if (error instanceof ApiError) {
    const result = handleApiError(error as ApiError<ActionError>);
    if (result) return result;
  } else if (error instanceof ZSAError) return handleZSAError(error);
  return handleUnknownError(error);
};

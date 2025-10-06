import ApiError from "@/lib/classes/Error/ApiError";
import UnknownError from "@/lib/classes/Error/UnknownError";
import { BaseErrReturnType, ErrorKeys } from "@/lib/types/errors/server/base";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { ZSAError } from "zsa";
import { handleApiError } from "./handlers/api.err";
import { handleZSAError } from "./handlers/zsa.err";

export const handleErrors = (
  error: unknown
): BaseErrReturnType<typeof ERROR_SCHEMA_v2> => {
  UnknownError.initialize();

  if (error instanceof ApiError) {
    const result = handleApiError(error as ApiError<ErrorKeys>);
    if (result) return result;
  }
  return handleZSAError(error as ZSAError);
};

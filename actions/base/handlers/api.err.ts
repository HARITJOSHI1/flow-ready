import ApiError from "@/lib/classes/Error/ApiError";
import {
  ActionError,
  BaseErrReturnType,
} from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";

export function handleApiError(
  error: ApiError<ActionError>
): BaseErrReturnType<typeof ERROR_SCHEMA> | undefined {
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    console.info("Caught ApiError:", error);

  switch (error.details.type) {
    case ERROR_TYPES.AUTH_CHECK_ERROR:
      return {
        resolved: "error",
        error: error.details,
      };
    default:
      return undefined;
  }
}

import ApiError from "@/lib/classes/Error/ApiError";
import {
  ActionError,
  BaseErrReturnType,
} from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";

export function handleUnknownError(
  error: unknown
): BaseErrReturnType<typeof ERROR_SCHEMA> {
  const unseenError = ApiError.uncaught<ActionError>(
    {
      status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      type: ERROR_TYPES.UNKNOWN_ERROR,
      message: "An unexpected error occurred",
      code: 500,
      extraDetails: {
        environment: process.env.NODE_ENV, 
        functionName: "handleErrors()",
      },
    },
    undefined,
    true,
    true
  );

  if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    console.info("An uncaught error occured:", error);

  return {
    resolved: "error",
    error: unseenError.details,
  };
}

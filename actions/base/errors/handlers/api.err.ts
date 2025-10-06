import ApiError from "@/lib/classes/Error/ApiError";
import {
  BaseErrReturnType, ErrorKeys
} from "@/lib/types/errors/server/base";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";

export function handleApiError(
  error: ApiError<ErrorKeys>
): BaseErrReturnType<typeof ERROR_SCHEMA_v2> {
  switch (error.type) {
    case "AUTH_CHECK_ERROR":
      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.UNAUTHORIZED,
          type: "AUTH_CHECK_ERROR",
          message: error.message || "User not authenticated",
          code: 401,
          extraDetails: error.details ?? {
            environment: process.env.NODE_ENV,
            functionName: "handleApiError()",
          },
        },
      };

    default:
      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
          type: "INTERNAL_SERVER_ERROR",
          message: error.message || "An unexpected error occurred",
          code: 500,
          extraDetails: {
            environment: process.env.NODE_ENV,
            functionName: "handleErrors()",
          },
        },
      };
  }
}

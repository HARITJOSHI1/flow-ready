import ApiError from "@/lib/classes/Error/ApiError";
import { BaseErrReturnType } from "@/lib/types/errors/server/base";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { ZSAError } from "zsa";

export function handleUnknownError(
  error: ZSAError
): BaseErrReturnType<typeof ERROR_SCHEMA_v2> {
  const unseenError = ApiError.uncaught(
    "UNKNOWN_ERROR",
    500,
    error.message || "An unexpected error occurred",
    true,
    {
      environment: process.env.NODE_ENV,
      functionName: "handleErrors()",
    }
  );

  return {
    resolved: "error",
    error: unseenError,
  };
}

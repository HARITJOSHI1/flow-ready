import { BaseErrReturnType } from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ZodError } from "zod";

export function handleZodError(
  error: ZodError
): BaseErrReturnType<typeof ERROR_SCHEMA> {
  const isDev = process.env.NODE_ENV === "development";
  const formattedError = isDev
    ? error.format()
    : error.errors.map((e) => ({
        path: e.path,
        message: e.message,
      }));

  console.info("Caught ZodError:", formattedError);
  return {
    resolved: "error",
    error: {
      status: RESPONSE_STATUS.BAD_REQUEST,
      type: ERROR_TYPES.VALIDATION_ERROR,
      message: "Validation failed",
      code: 400,
      extraDetails: {
        environment: process.env.NODE_ENV,
        functionName: "handleErrors()",
      },
      validationErrror: formattedError,
    },
  };
}

import DatabaseError from "@/lib/classes/Error/DbError";
import { ErrorNames } from "@/lib/classes/interface/IErrorClass";
import { BaseErrReturnType } from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ZodError } from "zod";
import { ZSAError } from "zsa";
import { ZodValidationError } from "./zod.err";

export function handleZSAError(
  error: ZSAError
): BaseErrReturnType<typeof ERROR_SCHEMA> {
  switch (error.name as ErrorNames) {
    case "ZodError":
      const data = error.data as ZodError;
      const zodError = ZodValidationError.handle(data);

      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.BAD_REQUEST,
          type: zodError.type,
          message: zodError.message,
          code: zodError.statusCode,
          extraDetails: {
            environment: process.env.NODE_ENV,
            functionName: "handleErrors()",
          },
          validationError: zodError.details,
        },
      };

    case "PostgresError":
      const dbError = DatabaseError.handleError(error);

      if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
      )
        console.info("Handled DatabaseError:", dbError);

      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
          type: dbError.type,
          message: dbError.message,
          code: dbError.statusCode,
          extraDetails: {
            environment: process.env.NODE_ENV,
            functionName: "handleErrors()",
          },
        },
      };

    default:

    // handle unknown errors rn a temp fix not detailed enough
      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
          type: ERROR_TYPES.INTERNAL_SERVER_ERROR,
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

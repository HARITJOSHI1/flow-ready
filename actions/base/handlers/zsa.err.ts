import DatabaseError from "@/lib/classes/Error/DbError";
import { BaseErrReturnType } from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ZSAError } from "zsa";

export function handleZSAError(
  error: ZSAError
): BaseErrReturnType<typeof ERROR_SCHEMA> {
  const dbError = DatabaseError.handleError(error);

  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    console.info("Handled DatabaseError:", dbError);

  return {
    resolved: "error",
    error: {
      status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      type: dbError.code as ERROR_TYPES,
      message: dbError.message,
      code: dbError.statusCode,
      extraDetails: {
        environment: process.env.NODE_ENV,
        functionName: "handleErrors()",
      },
    },
  };
}

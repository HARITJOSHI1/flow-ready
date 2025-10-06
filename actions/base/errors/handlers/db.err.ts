import DatabaseError, { DbErrorCode } from "@/lib/classes/Error/DbError";
import { BaseErrReturnType } from "@/lib/types/errors/server/base";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";

export function handleDBError(
  dbError: DatabaseError<DbErrorCode>
): BaseErrReturnType<typeof ERROR_SCHEMA_v2> {
  return {
    resolved: "error",
    error: {
      status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      type: dbError.type,
      message: dbError.message,
      code: dbError.statusCode,
      extraDetails: {
        environment: process.env.NODE_ENV,
        functionName: "handleDBError()",
      },
    },
  };
}

import ApiError from "@/lib/classes/Error/ApiError";
import DatabaseError from "@/lib/classes/Error/DbError";
import { ZodValidationError } from "@/lib/classes/Error/ZodError";
import { ErrorNames } from "@/lib/classes/Error/interface/IErrorClass";
import {
  BaseErrReturnType,
  ErrorKeys
} from "@/lib/types/errors/server/base";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { ZodError } from "zod";
import { ZSAError } from "zsa";
import { errorLogger } from "../helpers";
import { handleApiError } from "./api.err";
import { handleDBError } from "./db.err";
import { handleUnknownError } from "./unknown.err";
import { handleZodError } from "./zod.err";

export function handleZSAError(
  error: ZSAError
): BaseErrReturnType<typeof ERROR_SCHEMA_v2> {
  switch (error.name as ErrorNames) {
    case "ApiError":
      const apiError = error.data as ApiError<ErrorKeys>;
      errorLogger("ApiError", apiError);
      return handleApiError(apiError);

    case "ZodError":
      const originalError = error.data as ZodError;
      const zodError = ZodValidationError.handle(originalError);      
      errorLogger("ZodError", zodError);
      return handleZodError(originalError, zodError);

    case "PostgresError":
      const dbError = DatabaseError.handleError(error);
      errorLogger("PostgresError", dbError);
      return handleDBError(dbError);

    default:
      errorLogger("UnknownError", error as any);
      return handleUnknownError(error);
  }
}

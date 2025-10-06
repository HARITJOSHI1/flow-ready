import ApiError from "@/lib/classes/Error/ApiError";
import { ErrorNames } from "@/lib/classes/Error/interface/IErrorClass";
import { ErrorKeys } from "@/lib/types/errors/server/base";
import DatabaseError, { DbErrorCode } from "@/lib/classes/Error/DbError";
import { ZodValidationError } from "@/lib/classes/Error/ZodError";

type UnionErrorType =
  | ApiError<ErrorKeys>
  | ZodValidationError<ErrorKeys>
  | DatabaseError<DbErrorCode>;

export const errorLogger = (type: ErrorNames, error: UnionErrorType) => {
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    console.info(`${type} : ${JSON.stringify(error, null, 2)}`);
};

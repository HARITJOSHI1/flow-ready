import { PgCodeEnum } from "@/db/postgres/constants";
import {
  PgHandlerDetails,
  PostgresError,
} from "@/lib/types/errors/server/db";
import { EnumValues } from "@/lib/types/nodes";
import { ZSAError } from "zsa";
import { IErrorClassProps } from "./interface/IErrorClass";
import { ErrorKeys } from "@/lib/types/errors/server/base";

export type DbErrorCode = keyof typeof PgCodeEnum | ErrorKeys;
type DbErrorDetails = PgHandlerDetails;
type DbOriginalError = Omit<ZSAError, "stack">;

class DatabaseError<
    C extends DbErrorCode,
    D = DbErrorDetails,
    O = DbOriginalError
  >
  extends Error
  implements IErrorClassProps<C, D, O>
{
  constructor(
    public type: C,
    public statusCode: number = 500,
    public message: string,
    public details?: D,
    public orginalError?: O,
    public shouldAddStack?: boolean,
    public name: string = "DatabaseError"
  ) {
    super(message);
    if (shouldAddStack) this.stack = new Error().stack;
    else this.stack = undefined;
  }

  static handleError = (error: ZSAError) => {
    if (this.isPostgresError({ ...error }))
      return this.handlePostgresError(error);

    return new DatabaseError(
      "INTERNAL_ERROR",
      500,
      `An unexpected error occurred: ${error}`,
      { field: "", column: undefined, constraint: undefined, pgCode: undefined }
    );
  };

  private static isPostgresError(err: unknown) {
    const error = err as PostgresError & ZSAError;

    return (
      typeof error?.code === "string" &&
      (error.code.startsWith("23") ||
        error.code.startsWith("42") ||
        String(error.data).includes("PostgresError"))
    );
  }

  private static handlePostgresError(err: ZSAError) {
    const error = err as PostgresError & ZSAError;
    const code = error.code as EnumValues<typeof PgCodeEnum>;
    error.stack = undefined; // Remove stack to avoid circular references
    error.data = undefined; // Remove data to avoid circular references

    switch (code) {
      case "23505": // unique_violation
        return new DatabaseError(
          "UNIQUE_VIOLATION",
          400,
          `Duplicate value for field '${error.column}'`,
          {
            field: error.column,
            constraint: error.constraint,
            pgCode: undefined,
          },
          { ...error }
        );

      case "23503": // foreign_key_violation
        return new DatabaseError(
          "FOREIGN_KEY_VIOLATION",
          400,
          `Foreign key constraint violation on field '${error.column}'`,
          {
            field: error.column,
            constraint: error.constraint,
            pgCode: undefined,
          },
          { ...error }
        );

      case "23502": // not_null_violation
        return new DatabaseError(
          "NOT_NULL_VIOLATION",
          400,
          `Field '${error.column}' cannot be null`,
          {
            field: error.column,
            constraint: error.constraint,
            pgCode: undefined,
          },
          { ...error }
        );

      case "23514": // check_violation
        return new DatabaseError(
          "CHECK_VIOLATION",
          400,
          `Check constraint violation on field '${error.column}'`,
          {
            field: error.column,
            constraint: error.constraint,
            pgCode: undefined,
          },
          { ...error }
        );

      case "42703": // undefined_column
        return new DatabaseError(
          "UNDEFINED_COLUMN",
          400,
          `Undefined column '${error.column}' in query`,
          { field: error.column, constraint: undefined, pgCode: undefined },
          { ...error }
        );

      default:
        return new DatabaseError(
          "INTERNAL_ERROR",
          500,
          `Unknown database error`,
          {
            field: error.column,
            constraint: error.constraint,
            pgCode: error.code,
          },
          { ...error },
          true
        );
    }
  }
}

export default DatabaseError;

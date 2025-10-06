import { ParsedZodError } from "@/actions/base/errors/handlers/zod.err";
import { ZodError, ZodIssue } from "zod";
import { IErrorClassProps } from "./interface/IErrorClass";
import { envSchema } from "@/env";
import { ErrorKeys } from "@/lib/types/errors/server/base";

export class ZodValidationError<
    C extends ErrorKeys,
    D = ParsedZodError,
    O = ZodError
  >
  extends Error
  implements IErrorClassProps<C, D, O>
{
  constructor(
    public type: C,
    public statusCode: number = 500,
    public message: string,
    public details: D,
    public orginalError?: O,
    public shouldAddStack?: boolean,
    public name: string = "ZodValidationError"
  ) {
    super(message);
    if (shouldAddStack) this.stack = new Error().stack;
    else this.stack = undefined;
  }

  private static parseZodErrors(
    issues: ZodIssue[],
    env: typeof envSchema._output.NODE_ENV
  ): ParsedZodError {
    return issues.map((issue) => ({
      field: issue.path[issue.path.length - 1] as string,
      error: issue.message,
      path: issue.path,
      environment: env,
    }));
  }

  static handle(
    error: ZodError,
    shouldAddStack?: boolean,
  ) {
    const env = process.env.NODE_ENV;
    const formattedError = this.parseZodErrors(error.errors, env);
    error.stack = undefined; // Remove stack to avoid circular references

    return new ZodValidationError(
      "VALIDATION_ERROR",
      500,
      error.message,
      formattedError,
      error,
      shouldAddStack,
    );
  }
}

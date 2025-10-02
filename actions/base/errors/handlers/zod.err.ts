import { envSchema } from "@/env";
import { IErrorClassProps } from "@/lib/classes/interface/IErrorClass";
import { BaseErrReturnType } from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ZodError, ZodIssue } from "zod";

export type ParsedZodError = {
  field: string;
  error: string;
  path: (string | number)[];
  environment: typeof envSchema._output.NODE_ENV;
}[];

function parseZodErrors(
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

export function handleZodError(
  error: ZodError
): BaseErrReturnType<typeof ERROR_SCHEMA> {
  const env = process.env.NODE_ENV;
  const formattedError = parseZodErrors(error.errors, env);

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
      validationError: formattedError,
    },
  };
}

export class ZodValidationError<
    C extends keyof typeof ERROR_TYPES,
    D extends ParsedZodError,
    O extends ZodError
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
    public shouldLog?: boolean,
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
    shouldLog?: boolean
  ) {
    const env = process.env.NODE_ENV;
    const formattedError = this.parseZodErrors(error.errors, env);

    return new ZodValidationError(
      "VALIDATION_ERROR",
      500,
      error.message,
      formattedError,
      error,
      shouldAddStack,
      shouldLog
    );
  }
}

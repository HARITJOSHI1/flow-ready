import { envSchema } from "@/env";
import { ZodValidationError } from "@/lib/classes/Error/ZodError";
import { BaseErrReturnType, ErrorKeys } from "@/lib/types/errors/server/base";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
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
  originalError: ZodError,
  validationError: ZodValidationError<ErrorKeys>

): BaseErrReturnType<typeof ERROR_SCHEMA_v2> {
  const env = process.env.NODE_ENV;
  const formattedError = parseZodErrors(originalError.errors, env);

  return {
    resolved: "error",
    error: {
      status: RESPONSE_STATUS.BAD_REQUEST,
      type: validationError.type,
      message: validationError.message,
      code: validationError.statusCode,
      extraDetails: {
        environment: process.env.NODE_ENV,
        functionName: "handleErrors()",
      },
      validationError: validationError.details || formattedError,
    },
  };
}
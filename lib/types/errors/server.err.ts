import { envSchema } from "@/env";
import { z } from "zod";
import { RESPONSE_STATUS } from "../server";
import { PgCodeEnum } from "@/db/postgres/constants";

export enum ERROR_TYPES {
  AUTH_CHECK_ERROR = "AUTH_CHECK_FAILED",
  NO_WORKFLOWS = "NO_WORKFLOWS",
  CREATE_WORKFLOW_ERROR = "CREATE_WORKFLOW_ERROR",
  TASK_NOT_FOUND_ERROR = "TASK_NOT_FOUND",
  WORKFLOW_NOT_IN_DRAFT_ERROR = "WORKFLOW_STATUS_NOT_DRAFT",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  INPUT_PARSE_ERROR = "INPUT_PARSE_ERROR",
  OUTPUT_PARSE_ERROR = "OUTPUT_PARSE_ERROR",
  ERROR = "ERROR",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  TIMEOUT = "TIMEOUT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  PRECONDITION_FAILED = "PRECONDITION_FAILED",
  PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE",
  METHOD_NOT_SUPPORTED = "METHOD_NOT_SUPPORTED",
  UNPROCESSABLE_CONTENT = "UNPROCESSABLE_CONTENT",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  CLIENT_CLOSED_REQUEST = "CLIENT_CLOSED_REQUEST",
  INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  VALIDATION_ERROR = "ZOD_VALIDATION_FAILED",
  NO_EXECUTION_PLAN = "NO_EXECUTION_PLAN_AVAILABLE",
  INVALID_INPUTS = "INVALID_WORKFLOW:INPUT"
}

const extraDetailsSchema = z.discriminatedUnion("environment", [
  z.object({
    environment: z.literal(envSchema.shape.NODE_ENV.enum.development),
    functionName: z.string(),
  }),
  z.object({
    environment: z.literal(envSchema.shape.NODE_ENV.enum.production),
    functionName: z.string(),
  }),
  z.object({
    environment: z.literal(envSchema.shape.NODE_ENV.enum.test),
    functionName: z.string(),
  }),
]);

const validationErrorSchema = z.array(
  z.object({
    field: z.string(),
    error: z.string(),
    path: z.array(z.union([z.string(), z.number()])),
    environment: z.union([
      z.literal(envSchema.shape.NODE_ENV.enum.development),
      z.literal(envSchema.shape.NODE_ENV.enum.production),
      z.literal(envSchema.shape.NODE_ENV.enum.test),
    ]),
  })
);

export const ERROR_SCHEMA = z.object({
  type: z.union([
    z.nativeEnum(ERROR_TYPES),
    z.custom<keyof typeof ERROR_TYPES>(),
    z.custom<keyof typeof PgCodeEnum>(),
  ]),
  status: z.nativeEnum(RESPONSE_STATUS).optional(),
  code: z.number().optional(),
  message: z.string(),
  extraDetails: extraDetailsSchema.optional(),
  validationError: validationErrorSchema.optional(),
  filePath: z.string().optional(),
  data: z.unknown().optional()
});

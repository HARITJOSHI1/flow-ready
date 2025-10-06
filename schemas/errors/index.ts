import { PgCodeEnum } from "@/db/postgres/constants";
import { envSchema } from "@/env";
import { CLIENT_ERROR_TYPES } from "@/lib/types/errors/client/error";
import { SERVER_ERROR_TYPES } from "@/lib/types/errors/server";
import { API_ERROR_TYPES } from "@/lib/types/errors/server/api";
import { ErrorKeys } from "@/lib/types/errors/server/base";
import { DB_ERROR_TYPES } from "@/lib/types/errors/server/db";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { z } from "zod";

export const extraDetailsSchema = z.discriminatedUnion("environment", [
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

export const ERROR_SCHEMA_v2 = z.object({
  type: z.union([
    z.nativeEnum(SERVER_ERROR_TYPES),
    z.nativeEnum(API_ERROR_TYPES),
    z.nativeEnum(DB_ERROR_TYPES),
    z.nativeEnum(CLIENT_ERROR_TYPES),
    z.custom<ErrorKeys>(),
    z.custom<keyof typeof PgCodeEnum>(),
  ]),
  status: z.nativeEnum(RESPONSE_STATUS).optional(),
  code: z.number().optional(),
  message: z.string(),
  extraDetails: extraDetailsSchema.optional(),
  validationError: validationErrorSchema.optional(),
  filePath: z.string().optional(),
  data: z.unknown().optional(),
});

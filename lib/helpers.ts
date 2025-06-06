import { ZodType, z } from "zod";
import { TError, Result } from "./types/errors";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function createServerActionOutputSchema<
  TSuccess extends ZodType<any, any, any>,
  TError extends ZodType<any, any, any>
>(successSchema: TSuccess, errorSchema: TError) {
  return z.discriminatedUnion("resolved", [
    z.object({
      resolved: z.literal("success"),
      result: successSchema,
    }),
    z.object({
      resolved: z.literal("error"),
      error: errorSchema,
    }),
  ]);
}

export const err = <E extends TError>(error: E): Result<never, E> => ({
  success: false,
  error,
});

export const Ok = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
});

export const isOk = <T, E>(
  result: Result<T, E>
): result is { success: true; data: T } => result.success;

export const isErr = <T, E>(
  result: Result<T, E>
): result is { success: false; error: E } => !result.success;

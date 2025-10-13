import { ZodType, z } from "zod";
import { Result } from "../types/errors/client/error";
import { ActionError } from "../types/errors/server/base";

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


export const err = <E extends ActionError>(error: E): Result<never, E> => ({
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

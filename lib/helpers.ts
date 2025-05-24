import { revalidateTag } from "next/cache";
import { ZodType, z } from "zod";

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


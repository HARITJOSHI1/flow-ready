import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA } from "./server.err";
import { z } from "zod";

type BaseActionError<TSchema extends z.ZodTypeAny = typeof ERROR_SCHEMA> = z.infer<TSchema>;
export type ActionError = BaseActionError<typeof ERROR_SCHEMA>


export type BaseErrReturnType<
  TErrorSchema extends z.ZodTypeAny = typeof ERROR_SCHEMA
> = Extract<
  ReturnType<
    typeof createServerActionOutputSchema<z.ZodTypeAny, TErrorSchema>
  >["_output"],
  { resolved: "error" }
>;
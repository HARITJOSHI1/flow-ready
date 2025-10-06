import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { z } from "zod";
import { AllErrorTypes } from "..";

type BaseActionError<TSchema extends z.ZodTypeAny = typeof ERROR_SCHEMA_v2> =
  z.infer<TSchema>;

export type ActionError = BaseActionError<typeof ERROR_SCHEMA_v2>;
export type ErrorKeys = AllErrorTypes;
export type BaseErrReturnType<
  TErrorSchema extends z.ZodTypeAny = typeof ERROR_SCHEMA_v2
> = Extract<
  ReturnType<
    typeof createServerActionOutputSchema<z.ZodTypeAny, TErrorSchema>
  >["_output"],
  { resolved: "error" }
>;

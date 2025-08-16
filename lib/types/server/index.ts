import { createServerActionOutputSchema } from "@/lib/helpers";

export enum RESPONSE_STATUS {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  INFO = "INFO",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  CONFLICT = "CONFLICT",
}

export type ServerActionReturnType = ReturnType<typeof createServerActionOutputSchema>["_output"]
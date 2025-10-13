import { createServerActionOutputSchema } from "@/lib/helpers/global";

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

export type ServerActionReturnType<T> = ReturnType<typeof createServerActionOutputSchema>["_output"]['resolved'] extends "success" ? T : never
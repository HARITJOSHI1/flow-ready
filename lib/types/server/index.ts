import { Workflow } from "@/db/schema";
import { z } from "zod";

// Enums
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
export enum WORKFLOW_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

// Schemas
export const AUTH_STATE_RESULT_SCHEMA = z.object({
  userId: z.string(),
});

export const GET_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  workflows: z.array(z.custom<Workflow>()),
});

export const CREATE_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  message: z.string(),
  redirect_url: z.string(),
});

export const DELETE_WORKFLOW_ACTION_SCHEMA = z.object({
  message: z.string(),
});

// types
export type AUTH_STATE_RESULT = z.infer<typeof AUTH_STATE_RESULT_SCHEMA>;
export type GET_WORKFLOW_ACTION_RESULT = z.infer<
  typeof GET_WORKFLOW_ACTION_RESULT_SCHEMA
>;
export type CREATE_WORKFLOW_ACTION_RESULT = z.infer<
  typeof CREATE_WORKFLOW_ACTION_RESULT_SCHEMA
>;

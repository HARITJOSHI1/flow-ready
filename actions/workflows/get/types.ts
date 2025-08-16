import { Workflow } from "@/db/schema";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { z } from "zod";

// Zod schema for the Workflow type
export const WORKFLOW_SCHEMA = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  userId: z.string(),
  defination: z.string(), // Adjust this if you know the shape of 'defination'
  status: z.enum(["DRAFT", "PUBLISHED"]),
  createdAt: z.string().transform((str) => new Date(str)),
  updatedAt: z.string().transform((str) => new Date(str)),
});

export const GET_WORKFLOWS_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  workflows: z.array(WORKFLOW_SCHEMA),
});

export const GET_WORKFLOW_ACTION_RESULT_SCHEMA = z.object({
  status: z.nativeEnum(RESPONSE_STATUS),
  workflow: WORKFLOW_SCHEMA,
});

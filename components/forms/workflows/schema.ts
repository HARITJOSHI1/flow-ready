import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(50).nonempty("Name is required"),
  description: z.string().max(80).optional(),
});

export const saveWorkflowSchema = z.object({
  workflowId: z.string().nonempty("Workflow Id is required"),
  defination: z.string().nonempty("Definition is required"),
});

export type TCreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;

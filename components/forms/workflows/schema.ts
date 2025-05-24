import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(50).nonempty("Name is required"),
  description: z.string().max(80).optional(),
});

export type TCreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;

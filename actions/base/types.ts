import { z } from "zod";

export type ErrorHandlerType = "api" | "unknown" | "zod" | "zsa";

export const BASE_RESULT_SCHEMA = z.object({
  userId: z.string(),
});

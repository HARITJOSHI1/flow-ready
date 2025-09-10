import { z } from "zod";

export const BASE_RESULT_SCHEMA = z.object({
  userId: z.string(),
});

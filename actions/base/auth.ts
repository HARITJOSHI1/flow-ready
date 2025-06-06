import { createServerActionOutputSchema } from "@/lib/helpers";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors";
import { AUTH_STATE_RESULT_SCHEMA, RESPONSE_STATUS } from "@/lib/types/server";
import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";

export const authedProcedure = createServerActionProcedure()
  .output(
    createServerActionOutputSchema(
      AUTH_STATE_RESULT_SCHEMA,
      ERROR_SCHEMA
    )
  )
  .handler(async () => {
    const authState = auth();
    if (!authState.userId) {
      return {
        resolved: "error",
        error: {
          type: ERROR_TYPES.AUTH_CHECK_ERROR,
          status: RESPONSE_STATUS.UNAUTHORIZED,
          code: 400,
          message: "User not authenticated",
          shouldLog: false,
        },
      };
    }

    return {
      resolved: "success",
      result: { userId: authState.userId },
    };
  });

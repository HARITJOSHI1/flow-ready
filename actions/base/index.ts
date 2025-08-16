import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { ActionError } from "@/lib/types/errors/base.action.err";
import { ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors/server.err";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";
import { handleErrors } from "./error";
import { BASE_RESULT_SCHEMA } from "./types";

export const base = createServerActionProcedure()
  .output(createServerActionOutputSchema(BASE_RESULT_SCHEMA, ERROR_SCHEMA))
  .onError(handleErrors)
  .handler(async () => {
    const authState = auth();
    if (!authState.userId) {
      throw ApiError.auth<ActionError>(
        {
          type: ERROR_TYPES.AUTH_CHECK_ERROR,
          status: RESPONSE_STATUS.UNAUTHORIZED,
          code: 400,
          message: "User not authenticated",
          extraDetails: {
            environment: process.env.NODE_ENV,
            functionName: "base.handler()",
          },
        },
        undefined,
        false,
        false
      );
    }

    return {
      resolved: "success",
      result: { userId: authState.userId },
    };
  });

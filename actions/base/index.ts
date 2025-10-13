import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { BASE_RESULT_SCHEMA } from "@/schemas/base";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";
import { handleErrors } from "./errors/root";

export const base = createServerActionProcedure()
  .output(createServerActionOutputSchema(BASE_RESULT_SCHEMA, ERROR_SCHEMA_v2))
  .onError(handleErrors)
  .handler(async () => {
    const authState = auth();
    if (!authState.userId) {
      throw ApiError.auth(
        "AUTH_CHECK_ERROR",
        401,
        "User not authenticated",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "base()",
        }
      );
    }

    return {
      resolved: "success",
      result: { userId: authState.userId },
    };
  });

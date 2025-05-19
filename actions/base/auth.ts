import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";
import { Result, ok, err } from "neverthrow";
import { AUTH_STATE_RESULT, AUTH_SERVER_ACTION_ERROR } from "@/lib/types";

export const authedProcedure = createServerActionProcedure().handler(
  async (): Promise<Result<AUTH_STATE_RESULT, AUTH_SERVER_ACTION_ERROR>> => {
    const authState = auth();

    if (!authState.userId) {
      return err({
        type: "AUTH_CHECK_ERROR",
        code: 400,
        message: "User not authenticated",
        shouldLog: false,
      });
    }

    return ok({ userId: authState.userId });
  }
);

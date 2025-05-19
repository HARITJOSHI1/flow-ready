"use server";

import { authedProcedure } from "../base/auth";
import { Result, ok, err } from "neverthrow";
import {
  WORKFLOW_ACTION_RESULT,
  WORKFLOW_ACTION_NO_WORKFLOWS_ERROR,
  AUTH_SERVER_ACTION_ERROR,
} from "@/lib/types";
import db from "@/db";
import { workflow } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getUserWorkflows = authedProcedure
  .createServerAction()
  .handler(
    async ({
      ctx,
    }): Promise<
      Result<
        WORKFLOW_ACTION_RESULT,
        WORKFLOW_ACTION_NO_WORKFLOWS_ERROR | AUTH_SERVER_ACTION_ERROR
      >
    > => {
      if (ctx.isErr()) return err(ctx.error);
      const { userId } = ctx.value;

      const workflows = await db
        .select()
        .from(workflow)
        .where(eq(workflow.userId, userId))
        .orderBy(asc(workflow.createdAt));

      if (!workflows.length)
        return err({
          type: "WORKFLOW_ACTION_NO_WORKFLOWS_ERROR",
          code: 404,
          message: "No workflows found. Please create a new workflow",
          shouldLog: false,
        });

      return ok({
        workflows,
      });
    }
  );

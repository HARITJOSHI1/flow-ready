"use server";

import {
  RESPONSE_STATUS,
  WORKFLOW_STATUS,
  GET_WORKFLOW_ACTION_RESULT_SCHEMA,
  CREATE_WORKFLOW_ACTION_RESULT_SCHEMA,
  DELETE_WORKFLOW_ACTION_SCHEMA,
} from "@/lib/types";
import { authedProcedure } from "../base/auth";
import { SERVER_ACTION_ERROR_SCHEMA, ERROR_TYPES } from "@/lib/types/errors";
import db from "@/db";
import { workflow } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { createWorkflowSchema } from "@/components/forms/workflows/schema";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { z } from "zod";

// Cache the database query
const getWorkflowsFromDB = async (userId: string) => {
  return db
    .select()
    .from(workflow)
    .where(eq(workflow.userId, userId))
    .orderBy(desc(workflow.createdAt));
};

export const getUserWorkflows = authedProcedure
  .createServerAction()
  .output(
    createServerActionOutputSchema(
      GET_WORKFLOW_ACTION_RESULT_SCHEMA,
      SERVER_ACTION_ERROR_SCHEMA
    )
  )
  .handler(async ({ ctx }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };
    const { userId } = ctx.result;

    const workflows = await unstable_cache(
      getWorkflowsFromDB,
      [`workflows-user-${userId}`],
      {
        tags: [`workflows-user-${userId}`],
      }
    )(userId);

    if (!workflows.length)
      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.NOT_FOUND,
          type: ERROR_TYPES.NO_WORKFLOWS_ERROR,
          code: 404,
          message: "No workflows found. Please create a new workflow",
        },
      };

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        workflows,
      },
    };
  });

export const createWorkflow = authedProcedure
  .createServerAction()
  .input(createWorkflowSchema)
  .output(
    createServerActionOutputSchema(
      CREATE_WORKFLOW_ACTION_RESULT_SCHEMA,
      SERVER_ACTION_ERROR_SCHEMA
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };
    const userId = ctx.result.userId!;
    const { name, description } = input;

    const result = await db
      .insert(workflow)
      .values({
        name,
        description,
        defination: "TODO",
        userId,
        status: WORKFLOW_STATUS.DRAFT,
      })
      .returning();

    if (!result.length) {
      return {
        resolved: "error",
        error: {
          status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
          type: ERROR_TYPES.CREATE_WORKFLOW_ERROR,
          message: "Failed to create workflow",
          code: 500,
        },
      };
    }

    // Revalidate the cache directly here
    revalidateTag(`workflows-user-${userId}`);

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        message: "Workflow created successfully",
        redirect_url: `/workflows/editor/${result[0].id}`,
      },
    };
  });

export const deleteWorkflow = authedProcedure
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
    })
  )
  .output(
    createServerActionOutputSchema(
      DELETE_WORKFLOW_ACTION_SCHEMA,
      SERVER_ACTION_ERROR_SCHEMA
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const result = await db
      .delete(workflow)
      .where(eq(workflow.name, input.name))
      .returning();

    revalidateTag(`workflows-user-${result[0].userId}`);

    return {
      resolved: "success",
      result: {
        message: "Workflow deleted successfully",
      },
    };
  });

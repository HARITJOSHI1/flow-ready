"use server";

import { createWorkflowSchema } from "@/components/forms/workflows/schema";
import db from "@/db";
import { workflow } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { createServerActionOutputSchema } from "@/lib/helpers";
import { AppNode } from "@/lib/types/nodes";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { TaskType } from "@/lib/types/tasks";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { WORKFLOW_STATUS } from "@/lib/workflow/type";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { Edge } from "@xyflow/react";
import { revalidateTag } from "next/cache";
import { base } from "../../base";
import { CREATE_WORKFLOW_ACTION_RESULT_SCHEMA } from "./schema";

export const createWorkflow = base
  .createServerAction()
  .input(createWorkflowSchema)
  .output(
    createServerActionOutputSchema(
      CREATE_WORKFLOW_ACTION_RESULT_SCHEMA,
      ERROR_SCHEMA_v2
    )
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const userId = ctx.result.userId!;
    const { name, description } = input;

    // create workflow entry point in the database
    const initFlow: { nodes: AppNode[]; edges: Edge[] } = {
      nodes: [],
      edges: [],
    };

    initFlow.nodes.push(TaskRegistry.convertFlowNode(TaskType.LAUNCH_BROWSER));

    const result = await db
      .insert(workflow)
      .values({
        name,
        description,
        defination: JSON.stringify(initFlow),
        userId,
        status: WORKFLOW_STATUS.DRAFT,
      })
      .returning();

    if (!result.length) {
      throw ApiError.notFound(
        "CREATE_WORKFLOW_ERROR",
        500,
        "Failed to create workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "createWorkflow()",
        }
      );
    }

    // Revalidate the cache directly here
    revalidateTag(`workflows-user-${userId}`);

    return {
      resolved: "success",
      result: {
        status: RESPONSE_STATUS.SUCCESS,
        message: "Workflow created successfully",
        redirect_url: `/workflow/editor/${result[0].id}`,
      },
    };
  });

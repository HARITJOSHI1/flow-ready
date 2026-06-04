"use server";

import ApiError from "@/lib/classes/Error/ApiError";
import { isErr } from "@/lib/helpers/global";
import { z } from "zod";
import { base } from "../../base";
import { getWorkflowsFromDB } from "../../workflows/functions/getWorkflowsFromDB";
import db from "@/db";
import { workflow as workflowTable } from "@/db/schema";
import { FlowToExecutionPlan } from "@/lib/executionPlan";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { calculateCostOfWorkflow } from "../functions/calculateCostOfWorkflow";

export const publishWorkflow = base
  .createServerAction()
  .input(
    z.object({
      workflowId: z.string(),
      flowDefination: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    if (ctx.resolved === "error")
      return { resolved: "error", error: ctx.error };

    const { workflowId, flowDefination } = input;
    const { userId } = ctx.result;

    if (!workflowId)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "Cannot use a non-workflow Id to retrieve workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "publishWorkflow()",
        },
      );

    const [workflow] = await getWorkflowsFromDB(
      ctx.result.userId,
      undefined,
      workflowId,
    );

    if (!workflow)
      throw ApiError.notFound(
        "NO_WORKFLOWS",
        404,
        "No workflow found. Please create a new workflow",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "publishWorkflow()",
        },
      );

    if (workflow.status !== "DRAFT")
      throw ApiError.notFound(
        "NOT_FOUND",
        404,
        "Workflow is not a draft",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "publishWorkflow()",
        },
      );

    const flow = JSON.parse(flowDefination);
    const exexPlan = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (!exexPlan || isErr(exexPlan))
      throw ApiError.internal(
        "BAD_REQUEST",
        400,
        "No execution plan is generated",
        false,
        {
          environment: process.env.NODE_ENV,
          functionName: "publishWorkflow()",
        },
      );

    const costOfEntireWorkflow = calculateCostOfWorkflow(flow.nodes);

    console.log("Total cost",  costOfEntireWorkflow)

    await db
      .update(workflowTable)
      .set({
        status: "PUBLISHED",
        creditsCost: costOfEntireWorkflow,
        executionPlan: JSON.stringify(exexPlan.data.executionPlan),
      })
      .where(
        and(
          eq(workflowTable.id, workflowId),
          eq(workflowTable.userId, ctx.result.userId),
        ),
      );

    revalidateTag(`workflows-user-${userId}`);
    revalidatePath(`/workflow/editor/${workflowId}`);
  });

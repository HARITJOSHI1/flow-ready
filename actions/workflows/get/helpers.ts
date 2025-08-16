import db from "@/db";
import { workflow, Workflow } from "@/db/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export const getWorkflowsFromDB = async <K extends keyof Workflow>(
  userId: string,
  select?: Record<K, boolean>,
  workflowId?: string
) => {
  const allColumns = getTableColumns(workflow) as Record<
    keyof Workflow,
    PgColumn
  >;
  const selectObj = { ...allColumns };

  if (select) {
    // Only include columns where select[key] is true
    Object.keys(select).forEach((key) => {
      selectObj[key as keyof Workflow] =
        allColumns[key as keyof typeof allColumns];
    });
  }

  const result = !workflowId
    ? await db
        .select(selectObj)
        .from(workflow)
        .where(eq(workflow.userId, userId))
        .orderBy(desc(workflow.createdAt))
    : await db
        .select(selectObj)
        .from(workflow)
        .where(eq(workflow.id, workflowId))
        .orderBy(desc(workflow.createdAt));

  const workflows =
    result.length > 0 ? (select ? (result as Pick<Workflow, K>[]) : result) : [];

  return workflows;
};

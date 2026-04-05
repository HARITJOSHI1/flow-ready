"use client";

import { getUserWorkflows } from "@/actions/workflows/queries/getUserWorkflows";
import { Workflow } from "@/db/schema";
import { BaseErrReturnType } from "@/lib/types/errors/server/base";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { useServerActionQuery } from "../../global/server-action-hooks";
import { getWorkflow } from "@/actions/workflows/queries/getWorkflow";

const formatWorkflowInp = <K extends keyof Workflow>(
  id?: string,
  select?: Record<K, true>
) => {
  if (id) return { workflowId: id, selectable: select };
  return { selectable: select };
};

// Type guards for better type safety
const isWorkflowResult = (data: any): data is { workflow: Workflow } =>
  data && typeof data === "object" && "workflow" in data;

const isWorkflowsResult = (data: any): data is { workflows: Workflow[] } =>
  data && typeof data === "object" && "workflows" in data;

// Overloaded function signatures for proper typing
export function useGetWorkflowQuery<K extends keyof Workflow>(
  id: string,
  select: Record<K, true>
): {
  workflow: Pick<Workflow, K> | null;
  error?: BaseErrReturnType<typeof ERROR_SCHEMA_v2>;
  isPending: boolean;
};

export function useGetWorkflowQuery<K extends keyof Workflow>(
  id: string,
  select?: undefined
): {
  workflow: Workflow | null;
  error?: BaseErrReturnType<typeof ERROR_SCHEMA_v2>;
  isPending: boolean;
};

export function useGetWorkflowQuery<K extends keyof Workflow>(
  id: undefined,
  select?: Record<K, true>
): {
  workflow: Pick<Workflow, K>[] | null;
  error?: BaseErrReturnType<typeof ERROR_SCHEMA_v2>;
  isPending: boolean;
};

export function useGetWorkflowQuery<K extends keyof Workflow>(
  id?: undefined,
  select?: undefined
): {
  workflow: Workflow[] | null;
  error?: BaseErrReturnType<typeof ERROR_SCHEMA_v2>;
  isPending: boolean;
};

// Implementation
export function useGetWorkflowQuery<K extends keyof Workflow>(
  id?: string,
  select?: Record<K, true>
): any {
  const callFn = id ? getWorkflow : getUserWorkflows;
  const { data, error, isPending } = useServerActionQuery(callFn, {
    input: formatWorkflowInp(id, select),
    queryKey: id ? ["get-workflow", id] : ["get-workflows"],
  } as any);

  // Handle error or pending states
  if (error || isPending || data?.resolved === "error")
    return {
      workflow: null,
      error: error || (data?.resolved === "error" ? data.error : null),
      isPending,
    };

  // Extract workflow data based on the response structure
  let workflowData: Workflow | Workflow[] | null = null;

  if (id) {
    // Single workflow case
    if (isWorkflowResult(data.result)) workflowData = data.result.workflow;
    else if (isWorkflowsResult(data.result))
      // Handle case where workflows response is returned for single workflow
      workflowData = data.result.workflows[0] || null;
    // Handle case where single workflow might be returned directly
    // @ts-ignore
    else workflowData = data.result as Workflow;
  } else {
    // Multiple workflows case
    if (isWorkflowsResult(data.result)) workflowData = data.result.workflows;
    else if (Array.isArray(data.result))
      // Handle case where workflows array might be returned directly
      workflowData = data.result as Workflow[];
  }

  // Apply Pick typing if select is provided
  if (workflowData && select) {
    if (Array.isArray(workflowData)) {
      return {
        workflow: workflowData.map((w) => {
          const picked: Partial<Workflow> = {};
          for (const key in select) {
            picked[key] = w[key];
          }
          return picked as Pick<Workflow, K>;
        }),
        error: null,
        isPending,
      };
    } else {
      const picked: Partial<Workflow> = {};
      for (const key in select) {
        picked[key] = workflowData[key];
      }
      return {
        workflow: picked as Pick<Workflow, K>,
        error: null,
        isPending,
      };
    }
  }

  // Return without Pick typing
  return {
    workflow: workflowData,
    error: null,
    isPending,
  };
}

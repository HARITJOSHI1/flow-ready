"use client";

import { getWorkflowWithExecutionPhases } from "@/actions/execution/queries/getWorkflowWithExecutionPhases";
import {
  QueryKeyFactory,
  useServerActionQuery,
} from "../../global/server-action-hooks";
import { WORKFLOW_EXEC_PHASES_ACTION_RESULT } from "@/actions/execution/queries/schema";

export const useQueryExecutionViewer = (
  initData: WORKFLOW_EXEC_PHASES_ACTION_RESULT
) => {
  const { isPending, error, data, isSuccess } = useServerActionQuery(
    getWorkflowWithExecutionPhases,
    {
      input: {
        executionId: initData.workflow_execution.id,
      },
      queryKey: QueryKeyFactory.execution(initData.workflow_execution.id),
      refetchInterval: (q) => {
        const status =
          q.state.data?.resolved === "success"
            ? q.state.data.result.workflow_execution.status
            : null;
        return status === "RUNNING" || status === "PENDING" ? 1000 : false;
      },
    }
  );

  if (data?.resolved === "error" || !data?.resolved) return { isPending, error };

  return { isPending, data: data.result, isSuccess };
};
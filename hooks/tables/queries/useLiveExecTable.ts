"use client";

import { getAvailableCredits } from "@/actions/billing/queries/getAvailableCredits";
import { getWorkflowExecutions } from "@/actions/execution/queries/getWorkflowWithExecutionPhases";
import { InitDataType } from "@/app/workflow/runs/[workflowId]/[executionId]/_components/execution-table";
import {
  QueryKeyFactory,
  useServerActionQuery,
} from "@/hooks/global/server-action-hooks";

export const useLiveExecTable = ({
  workflowId,
  initData,
}: {
  workflowId: string;
  initData: InitDataType;
}) => {
  const { isPending, error, data, isSuccess } = useServerActionQuery(
    getWorkflowExecutions,
    {
      input: { workflowId },
      initialData: initData!,
      queryKey: QueryKeyFactory.executionTable(workflowId),
      refetchInterval: 5000,
    },
  );

  if (data?.resolved === "error" || !data?.resolved)
    return { isPending, error };

  return { isPending, data: data.result, isSuccess };
};

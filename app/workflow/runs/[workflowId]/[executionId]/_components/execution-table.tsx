"use client";

import { getWorkflowExecutions } from "@/actions/execution/queries/getWorkflowWithExecutionPhases";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLiveExecTable } from "@/hooks/tables/queries/useLiveExecTable";
import { datesToDuration } from "@/lib/helpers/dateToDuration";
import React from "react";
import ExecutionStatusIndicator from "./execution-status-indicator";
import { CoinsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

export type InitDataType = Awaited<ReturnType<typeof getWorkflowExecutions>>[0];

type Props = {
  workflowId: string;
  initData: InitDataType;
};

const ExecutionTable = ({ workflowId, initData }: Props) => {
  const { data } = useLiveExecTable({ workflowId, initData });
  const router = useRouter();

  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Started at (desc)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="gap-2 h-full overflow-auto">
          {data?.workflow_execution.map((execution) => {
            const formattedStartedAt =
              execution.startedAt &&
              formatDistanceToNow(execution.startedAt, { addSuffix: true });

            const duration = datesToDuration(
              execution.completedAt,
              execution.startedAt,
            );

            return (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/workflow/runs/${workflowId}/${execution.id}`)
                }
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{execution.id}</span>
                    <div className="text-muted-foreground text-xs">
                      <span>Triggered via</span>
                      <Badge variant={"outline"} className="ml-2">{execution.trigger}</Badge>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <ExecutionStatusIndicator status={execution.status} />

                      <span className="font-semibold capitalize">
                        {execution.status}
                      </span>
                    </div>

                    <div className="text-muted-foreground text-xs mx-5">
                      {duration?.dateString}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <CoinsIcon className="text-primary" size={16} />
                      <span className="font-semibold capitalize">
                        {execution.creditsConsumed}
                      </span>
                    </div>

                    <div className="text-muted-foreground text-xs mx-5">
                      Credits
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-right text-muted-foreground">
                  {formattedStartedAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExecutionTable;

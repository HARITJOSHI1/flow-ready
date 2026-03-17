"use client";

import { WORKFLOW_EXEC_PHASES_ACTION_RESULT } from "@/actions/execution/queries/schema";
import { useQueryExecutionViewer } from "@/hooks/exec/queries/useQueryExecutionViewer";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  WorkflowIcon,
} from "lucide-react";
import ExecutionLabel from "./execution-label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPhasesTotalCost } from "@/lib/helpers/getPhasesTotalCost";
import { datesToDuration } from "@/lib/helpers/dateToDuration";

type Props = {
  initData: WORKFLOW_EXEC_PHASES_ACTION_RESULT;
};

const ExecutionViewer = ({ initData }: Props) => {
  const { data } = useQueryExecutionViewer(initData);
  if (data?.resolved === "error" || !data?.resolved) return;
  const { result } = data;

  const { startedAt, completedAt } = result.workflow_execution;

  const duration = datesToDuration(
    new Date(startedAt!),
    new Date(completedAt!)
  );

  const creditConsumed = getPhasesTotalCost(result.phases);

  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] border-r-2 border-seperate flex flex-grow flex-col overflow-hidden">
        <div className="py=4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={result.workflow_execution.status}
          />

          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <div className="font-semibold lowercase flex gap-2 items-center">
                {result.workflow_execution.startedAt
                  ? formatDistanceToNow(
                      new Date(result.workflow_execution.startedAt),
                      { addSuffix: true }
                    )
                  : "-"}
              </div>
            }
          />

          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? (
                duration.dateString
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={creditConsumed}
          />
        </div>

        <Separator />

        <div className="flex justify-center py-2 items-center">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>

        <Separator />

        <div className="overflow-auto h-full px-2 py-4">
          {result.phases.map((phase) => (
            <Button
              key={phase.id}
              className="w-full justify-between"
              variant="ghost"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{phase.phaseNumber}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>

              <p className="text-xs text-muted-foreground">{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;

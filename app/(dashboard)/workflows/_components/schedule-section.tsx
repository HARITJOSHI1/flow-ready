import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { CornerDownRightIcon, MoveRightIcon, CoinsIcon } from "lucide-react";
import React from "react";
import SchedulerDialog from "./schedule-dialog";
import { Badge } from "@/components/ui/badge";

export default function ScheduleSection({
  isDraft,
  creditsCost,
  workflowId,
  cronStr,
}: {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  cronStr: string | null;
}) {
  if (isDraft) return null;

  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog workflowId={workflowId} cronStr={cronStr} />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex itemscenter gap-3">
          <Badge
            variant="outline"
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <CoinsIcon className="h-4 w-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}

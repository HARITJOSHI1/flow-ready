import { cn } from "@/lib/utils";
import { EXECUTION_PHASE_STATUS } from "@/lib/workflow/type";
import React from "react";

type Props = {
  status: keyof typeof EXECUTION_PHASE_STATUS;
};

const indicatorColors: Record<EXECUTION_PHASE_STATUS, string> = {
  PENDING: "bg-slate-400",
  RUNNING: "bg-yellow-400",
  FAILED: "bg-red-400",
  COMPLETED: "bg-emerald-600",
};

const ExecutionStatusIndicator = ({ status }: Props) => {
  return (
    <div className={cn("w-2 h-2 rounded-full", indicatorColors[status])} />
  );
};

export default ExecutionStatusIndicator;

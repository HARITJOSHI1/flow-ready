"use client";

import { WORKFLOW_EXEC_PHASES_ACTION_RESULT } from "@/actions/execution/queries/schema";
import CountupWrapper from "@/components/common/countup-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQueryExecutionViewer } from "@/hooks/exec/queries/useQueryExecutionViewer";
import { useQueryPhaseDetails } from "@/hooks/phases/queries/usePhaseDetails";
import { datesToDuration } from "@/lib/helpers/dateToDuration";
import { getPhasesTotalCost } from "@/lib/helpers/getPhasesTotalCost";
import { EXECUTION_PHASE_STATUS } from "@/lib/workflow/type";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  WorkflowIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ExecutionLabel from "./execution-label";
import LogViewer from "./log-viewer";
import ParameterViewer from "./parameter-viewer";
import PhaseStatusBadge from "./phase-status-badge";

type Props = {
  initData: WORKFLOW_EXEC_PHASES_ACTION_RESULT;
};

const ExecutionViewer = ({ initData }: Props) => {

  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const { data, error } = useQueryExecutionViewer(initData);
  const { data: phaseData, error: phaseError } = useQueryPhaseDetails(selectedPhase || "");

  if (error || phaseError) return;

  const duration = datesToDuration(
    data?.workflow_execution.startedAt,
    data?.workflow_execution.completedAt
  );

  const isRunning = data?.workflow_execution.status === "RUNNING";

  const creditConsumed = getPhasesTotalCost(data?.phases);

  console.log("@PHASE__DATA", phaseData);

  useEffect(() => {

    // While running we auto-select the current running phase in the sidebar
    const phases = data?.phases || [];
    if (isRunning) {
      const lastRunningPhase = phases.toSorted((a, b) => (a.startedAt! > b.startedAt!) ? -1 : 1)[0];

      setSelectedPhase(lastRunningPhase?.id);
      return;
    }

    const lastCompletedPhase = phases.toSorted((a, b) => (a.completedAt! > b.completedAt!) ? -1 : 1)[0];

    setSelectedPhase(lastCompletedPhase?.id)

  }, [isRunning, data?.phases, setSelectedPhase])


  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] border-r-2 border-seperate flex flex-grow flex-col overflow-hidden">
        <div className="py=4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={data?.workflow_execution.status}
          />

          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <div className="font-semibold lowercase flex gap-2 items-center">
                {data?.workflow_execution.startedAt
                  ? formatDistanceToNow(
                    new Date(data?.workflow_execution.startedAt),
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
            value={
              <CountupWrapper value={creditConsumed!} />
            }
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
          {data?.phases.map((phase) => (
            <Button
              key={phase.id}
              className="w-full justify-between"
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              onClick={() => { if (!isRunning) setSelectedPhase(phase.id) }}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{phase.phaseNumber}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>

              <PhaseStatusBadge status={phase.status as EXECUTION_PHASE_STATUS} />
            </Button>
          ))}
        </div>
      </aside>

      <div className="flex w-full h-full">
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in progress please wait</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex items-center flex-col gap-1 justify-center w-full h-full text-center ">

            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">Select a phase to view details</p>
            </div>
          </div>
        )}

        {!isRunning && selectedPhase && phaseData?.phase && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">

            <div className="flex items-center gap-2">

              <Badge variant="outline" className="space-x-4">

                <div className="flex items-center gap-1">
                  <CoinsIcon size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                  <span>{phaseData.phase.creditsConsumed}</span>
                </div>
              </Badge>


              <Badge variant="outline" className="space-x-4">

                <div className="flex items-center gap-1">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                  <span>{datesToDuration(phaseData.phase.startedAt, phaseData.phase.completedAt)?.dateString || '-'}</span>
                </div>
              </Badge>
            </div>

            <ParameterViewer title="Inputs"
              subtitle="Inputs used for this phase"
              paramsJSON={phaseData.phase.inputs}
            />

            <ParameterViewer title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJSON={phaseData.phase.outputs}
            />
            <LogViewer logs={phaseData.logs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionViewer;

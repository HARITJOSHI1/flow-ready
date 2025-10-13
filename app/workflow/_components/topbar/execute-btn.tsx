"use client";

import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/exec/mutations/useExecutionPlan";
import { useRunWorkflowMutation } from "@/hooks/exec/mutations/useRunWorkflow";
import { useReactFlow } from "@xyflow/react";
import { Loader2Icon, PlayIcon } from "lucide-react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { mutate, isPending } = useRunWorkflowMutation();
  const { toObject } = useReactFlow();
  // let isPending = false;

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={() => {
        if (typeof generate !== "function") {
          console.error("Workflow execution plan generation failed:", generate);
          return;
        }
        const plan = generate();
        if (!plan) return;

        // @ts-ignore
        mutate({ workflowId, flowDefination: JSON.stringify(toObject()) });
        console.log("----- plan -----");
        console.table(plan);
      }}
    >
      {isPending ? (
        <Loader2Icon size={20} className="stroke-primary stroke-2" />
      ) : (
        <PlayIcon size={20} className=" stroke-tertiary stroke-2" />
      )}
      Execute
    </Button>
  );
};

export default ExecuteBtn;

"use client";

import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/exec/mutations/useExecutionPlan";
import { toast } from "@/hooks/global/use-toast";
import { useUnpublishWorkflowMutation } from "@/hooks/unpublishing/mutations/useUnpublishWorkflowMutation";
import { useReactFlow } from "@xyflow/react";
import { DownloadIcon, Loader2Icon } from "lucide-react";

type Props = {
  workflowId: string;
};

const UnpublishBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { mutate, isPending } = useUnpublishWorkflowMutation(workflowId);
  const { toObject } = useReactFlow();

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

        toast({ title: "Publishing workflow..."});
        mutate({ workflowId, flowDefination: JSON.stringify(toObject()) });
      }}
    >
      {isPending ? (
        <Loader2Icon size={20} className="stroke-primary stroke-2" />
      ) : (
        <DownloadIcon size={20} className=" stroke-destructive/100 stroke-2" />
      )}
      Unpublish
    </Button>
  );
};

export default UnpublishBtn;

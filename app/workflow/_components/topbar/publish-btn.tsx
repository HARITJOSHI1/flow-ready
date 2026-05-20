"use client";

import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/exec/mutations/useExecutionPlan";
import { toast } from "@/hooks/global/use-toast";
import { usePublishWorkflowMutation } from "@/hooks/publishing/mutations/usePublishWorkflowMutation";
import { useReactFlow } from "@xyflow/react";
import { Loader2Icon, UploadIcon } from "lucide-react";

type Props = {
  workflowId: string;
};

const PublishBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { mutate, isPending } = usePublishWorkflowMutation(workflowId);
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
        <UploadIcon size={20} className=" stroke-tertiary stroke-2" />
      )}
      Publish
    </Button>
  );
};

export default PublishBtn;

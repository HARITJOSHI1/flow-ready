"use client";

import { Button } from "@/components/ui/button";
import { useSaveWorkflowMutation } from "@/hooks/workflows/use-save-workflow";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, Loader2Icon } from "lucide-react";

type Props = {
  workflowId: string;
};

const SaveBtn = ({ workflowId }: Props) => {
  const { toObject } = useReactFlow();
  const { mutate, isPending } = useSaveWorkflowMutation(workflowId);

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={() => {
        console.log("Saving workflow with ID:", workflowId);
        console.log("Workflow definition to save:", toObject());
        mutate({ workflowId, defination: JSON.stringify(toObject()) });
      }}
    >
      {isPending ? (
        <Loader2Icon size={20} className="stroke-primary stroke-2" />
      ) : (
        <CheckIcon size={20} className="stroke-primary stroke-2" />
      )}
      Save
    </Button>
  );
};

export default SaveBtn;

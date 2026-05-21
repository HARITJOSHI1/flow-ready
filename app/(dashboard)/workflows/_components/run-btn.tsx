import { Button } from "@/components/ui/button";
import { useRunWorkflowMutation } from "@/hooks/exec/mutations/useRunWorkflow";
import { toast } from "@/hooks/global/use-toast";
import { PlayIcon } from "lucide-react";
import React from "react";

type Props = {
  workflowId: string;
};

export const RunBtn = ({ workflowId }: Props) => {
  const { mutate, isPending } = useRunWorkflowMutation();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={() => {
        toast({ title: "Running workflow" });
        mutate({ workflowId });
      }}
      disabled={isPending}
    >
      <PlayIcon size={60} />
      Run
    </Button>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/exec/useExecutionPlan";
import { Loader2Icon, PlayIcon } from "lucide-react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  let isPending = false;

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={() => {
        const plan = generate();
        console.log("----- plan -----");
        console.table(plan);
        // mutate({ workflowId, defination: JSON.stringify(toObject()) });
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

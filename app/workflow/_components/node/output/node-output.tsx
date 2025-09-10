import { TaskOutputs } from "@/lib/types/tasks";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { colorForHandle } from "../common/colorHandle";

type Props = {
  children?: React.ReactNode;
};

const NodeOutputs = ({ children }: Props) => {
  return <div className="flex flex-col divide-y gap-[0.5px]">{children}</div>;
};

const NodeOutput = ({ output }: { output: TaskOutputs }) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name} </p>
      <Handle
        type="source"
        position={Position.Right}
        id={output.name}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          colorForHandle[output.type]
        )}
      />
    </div>
  );
};

export { NodeOutput, NodeOutputs };

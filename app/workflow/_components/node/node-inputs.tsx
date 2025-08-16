"use client";


import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";
import { TaskInputs } from "@/lib/types/tasks";

type Props = {
  children?: React.ReactNode;
};

const NodeInputs = ({ children }: Props) => {
  return <div className="flex flex-col divide-y gap-2">{children} </div>;
};

const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskInputs;
  nodeId: string;
}) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
};

export { NodeInput, NodeInputs };

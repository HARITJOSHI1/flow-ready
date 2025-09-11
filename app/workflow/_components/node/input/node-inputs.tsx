"use client";

import { cn } from "@/lib/utils";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";

import { TaskInputs } from "@/lib/types/tasks";
import NodeParamField from "../params/node-param-field";
import { colorForHandle } from "../common/colorHandle";

type Props = {
  children?: React.ReactNode;
};

const NodeInputs = ({ children }: Props) => {
  return <div className="flex flex-col gap-[0.5px]">{children} </div>;
};

const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskInputs;
  nodeId: string;
}) => {

  const edges = useEdges();
  const isConnected  = edges.some((edge) => edge.target === nodeId && edge.targetHandle === input.name);

  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected}/>
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          isConnectable={!isConnected} // Disable connection if the input is already connected
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            colorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

export { NodeInput, NodeInputs };


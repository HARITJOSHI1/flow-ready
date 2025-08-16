"use client";

import { AppNode } from "@/lib/types/nodes";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import StringParam from "../params/string-param";
import { TaskInputs, TaskParamType } from "@/lib/types/tasks";

type Props = {
  param: TaskInputs;
  nodeId: string;
};

const NodeParamField = ({ param, nodeId }: Props) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node.data.inputs[param.name] || "";

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node.data.inputs, nodeId, updateNodeData, param.name]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          value={value}
          param={param}
          updateNodeParamProps={updateNodeParamValue}
        />
      );

    default:
      <div className="w-full">
        <p className="text-xs text-muted-foreground">
          Unsupported parameter type: {param.type}
        </p>
      </div>;
  }
};

export default NodeParamField;

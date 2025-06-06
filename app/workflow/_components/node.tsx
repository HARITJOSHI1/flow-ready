import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { DataNode } from "@/lib/types/nodes";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as DataNode;
  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={nodeData.type} />
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";

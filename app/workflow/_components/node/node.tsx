import { isErr } from "@/lib/helpers";
import { DataNode } from "@/lib/types/nodes";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./style/node-card";
import NodeHeader from "./style/node-header";

import { NodeInput, NodeInputs } from "./input/node-inputs";
import { NodeOutput, NodeOutputs } from "./output/node-output";
import { Badge } from "@/components/ui/badge";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as DataNode;
  const task = TaskRegistry.getTask(nodeData.type);
  if (isErr(task)) return;

  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <Badge className="bg-primary text-white">{props.id}</Badge>
      <NodeInputs>
        {task.data.inputs?.map((input, idx) => (
          <NodeInput key={idx} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.data.outputs?.map((output, idx) => (
          <NodeOutput key={idx} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";

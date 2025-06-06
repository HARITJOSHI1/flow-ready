"use client";

import { Workflow } from "@/db/schema";
import { TaskType } from "@/lib/types/nodes";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import NodeComponent from "../../_components/node";

// This file is part of the workflow editor, which uses React Flow to visualize and manage workflows.
const nodeTypes = {
  FastFlowNode: NodeComponent,
};

type Props = { workflow: Workflow };

const FlowEditor = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    TaskRegistry.convertFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const fitViewOpts = {
    padding: 1,
  };

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOpts}
        fitView
      >
        <Controls
          position="top-left"
          className="bg-primary text-muted-foreground"
          fitViewOptions={fitViewOpts}
        />

        <Background />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;

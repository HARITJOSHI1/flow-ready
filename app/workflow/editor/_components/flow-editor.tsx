"use client";

import { Workflow } from "@/db/schema";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  ReactFlowJsonObject,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";
import NodeComponent from "../../_components/node/node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskInputs, TaskType } from "@/lib/types/tasks";
import DeletableEdge from "../../_components/edges/deletable-edge";

// This file is part of the workflow editor, which uses React Flow to visualize and manage workflows.
const nodeTypes = {
  FastFlowNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const fitViewOpts = {
  padding: 1.5,
};

type Props = { workflow: Workflow };
const FlowEditor = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  const flow = JSON.parse(workflow.defination) as ReactFlowJsonObject<
    Node,
    Edge
  >;

  // restore nodes and edges from the workflow definition
  // and set the viewport if it exists
  useEffect(() => {
    if (!flow) return;

    setNodes(flow.nodes || []);
    setEdges(flow.edges || []);

    // restoring viewport
    if (!flow.viewport) return;
    const { x = 0, y = 0, zoom = 1 } = flow.viewport;
    setViewport({ x, y, zoom });
  }, [workflow.defination, setEdges, setNodes, setViewport]);

  const ondragover = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const taskType = e.dataTransfer.getData("application/reactflow");
      if (typeof taskType === undefined || !taskType) return;

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = TaskRegistry.convertFlowNode(
        taskType as TaskType,
        position
      );
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;

      // remove the node if input value present as we can have only one input either from another node or from the input value

      const node = nodes.find((n) => n.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs as TaskInputs;
      delete nodeInputs[connection.targetHandle];

      updateNodeData(node.id, {
        inputs: nodeInputs,
      });
    },
    [setEdges, updateNodeData]
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOpts}
        fitView={!flow.viewport}
        onDragOver={ondragover}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls
          position="top-left"
          className="bg-primary text-muted-foreground"
          fitViewOptions={fitViewOpts}
          showInteractive={true}
        />

        <Background />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;

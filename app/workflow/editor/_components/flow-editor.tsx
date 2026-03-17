"use client";

import { Workflow } from "@/db/schema";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  MarkerType,
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
import { isErr, isOk } from "@/lib/helpers/global";
import { AppNode } from "@/lib/types/nodes";
import { useFlowValidation } from "@/hooks/validation/useFlowValidation";

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
  const result = useFlowValidation();
  const flow = JSON.parse(workflow.definition!) as ReactFlowJsonObject<
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
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  if (isErr(result)) return null;
  const { invalidInputs, clearErrors } = result.data;

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
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            markerEnd: {
              color: "green",
              type: MarkerType.Arrow,
              width: 30,
              height: 30,
            },
          },
          eds
        )
      );
      if (!connection.targetHandle) return;

      // remove the node if input value present as we can have only one input either from another node or from the input value i.e. String Param

      const node = nodes.find((n) => n.id === connection.target);
      if (!node) return;

      // Remove the node input value if an edge is connected
      const newNodeInputs = { ...(node.data.inputs as TaskInputs) };
      if (connection.targetHandle)
        delete newNodeInputs[connection.targetHandle];

      const hasErrors = invalidInputs.some((inv) => inv.nodeId === node.id);
      if (hasErrors) clearErrors();

      updateNodeData(node.id, {
        inputs: newNodeInputs,
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      // No self connection allowed
      if (connection.source === connection.target) return false;

      // same type connection is allowed
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      const sourceTask = TaskRegistry.getTask(sourceNode.data.type as TaskType);
      const targetTask = TaskRegistry.getTask(targetNode.data.type as TaskType);

      if (isOk(sourceTask) && isOk(targetTask)) {
        const input = targetTask.data.inputs?.find(
          (i) => i.name === connection.targetHandle
        );
        const output = sourceTask.data.outputs?.find(
          (o) => o.name === connection.sourceHandle
        );

        if (!output || !input) return false;
        else if (input.type !== output.type) return false;

        const hasCycle = (node: Node, visited = new Set()) => {
          if (visited.has(node.id)) return false;
          visited.add(node.id);

          for (const outgoer of getOutgoers(node, nodes, edges)) {
            if (outgoer.id === connection.source) return true;
            if (hasCycle(outgoer, visited)) return true;
          }
        };

        const detectedCycle = hasCycle(targetNode);
        return !detectedCycle;
      }

      // for anything else
      else return false;
    },
    [nodes]
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
        isValidConnection={isValidConnection}
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

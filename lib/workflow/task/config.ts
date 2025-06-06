import { AppNode, TaskType } from "@/lib/types/nodes";

const exportTaskConfig = (
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode => ({
  id: crypto.randomUUID(),
  type: "FastFlowNode",
  dragHandle: ".drag-handle",
  data: {
    type: nodeType,
    inputs: {},
  },
  position: position ?? { x: 0, y: 0 },
});

export default exportTaskConfig;

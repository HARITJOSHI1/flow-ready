import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isErr } from "@/lib/helpers";
import { AppNode } from "@/lib/types/nodes";
import { TaskType } from "@/lib/types/tasks";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";

type NewType = {
  taskType: TaskType;
  nodeId: string;
};

type NodeHeaderProps = NewType;
const NodeHeader = ({ taskType, nodeId }: NodeHeaderProps) => {
  const task = TaskRegistry.getTask(taskType);
  const { deleteElements, getNode, addNodes } = useReactFlow();

  if (isErr(task)) return;

  return (
    <div className="flex items-center gap-2 p-2">
      <task.data.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.data.label}
        </p>
        <div className="flex items-center gap-1">
          {task.data.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            {task.data.credits}
          </Badge>

          {!task.data.isEntryPoint && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 transition-all"
                onClick={() =>
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  })
                }
              >
                <TrashIcon className="stroke-red-500" size={12} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x + node.measured?.height! + 20;
                  const newY = node.position.y;

                  const cpyNode = TaskRegistry.convertFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });

                  addNodes([cpyNode]);
                }}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button className="drag-handle cursor-grab" variant="ghost">
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;

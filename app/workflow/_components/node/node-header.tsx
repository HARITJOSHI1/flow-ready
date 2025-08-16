import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isErr } from "@/lib/helpers";
import { TaskType } from "@/lib/types/tasks";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";

type NodeHeaderProps = {
  taskType: TaskType;
};
const NodeHeader = ({ taskType }: NodeHeaderProps) => {
  const task = TaskRegistry.getTask(taskType);
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
            TODO
          </Badge>
          <Button className="drag-handle cursor-grab" variant="ghost">
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;

import { isErr } from "@/lib/helpers/global";
import { AppNode } from "@/lib/types/nodes";
import { TaskRegistry } from "@/lib/workflow/task/registry";

export const calculateCostOfWorkflow = (nodes: AppNode[]): number => {
  return nodes.reduce((acc, node) => {
    const task = TaskRegistry.getTask(node.data.type);
    if (isErr(task)) return acc;
    return acc + task.data.credits;
  }, 0);
};

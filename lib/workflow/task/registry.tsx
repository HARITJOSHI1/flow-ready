import { err, Ok } from "@/lib/helpers";
import { ERROR_TYPES, Result, TError } from "@/lib/types/errors";
import { AppNode, Task, TaskType } from "@/lib/types/nodes";
import exportTaskConfig from "./config";
import { LaunchBrowserTask } from "./launch-browser";


class TaskRegistryClass {
  private static instance: TaskRegistryClass;
  private tasks: Map<TaskType, Task>;

  private constructor() {
    this.tasks = new Map();
    this.registerTask(LaunchBrowserTask);
  }

  public static getInstance(): TaskRegistryClass {
    if (!TaskRegistryClass.instance) {
      TaskRegistryClass.instance = new TaskRegistryClass();
    }
    return TaskRegistryClass.instance;
  }

  public registerTask(task: Task) {
    if (this.tasks.has(task.type))
      return err({
        message: "Task already exists",
        type: ERROR_TYPES.TASK_NOT_FOUND_ERROR,
      });
    this.tasks.set(task.type, task);
    return Ok({ success: true, message: "Task added to the registry" });
  }

  public getTask(type: TaskType): Result<Task, TError> {
    const task = this.tasks.get(type);
    if (!task)
      return err({
        message: "Task already exists",
        type: ERROR_TYPES.TASK_NOT_FOUND_ERROR,
      });
    return Ok(task);
  }

  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public getEntryPointTasks(): Task[] {
    return this.getAllTasks().filter((task) => task.isEntryPoint);
  }

  public convertFlowNode(
    nodeType: TaskType,
    position?: { x: number; y: number }
  ): AppNode {
    return exportTaskConfig(nodeType, position);
  }
}

// Export a singleton instance
export const TaskRegistry = TaskRegistryClass.getInstance();

import { err, Ok } from "@/lib/helpers";
import { ERROR_TYPES, } from "@/lib/types/errors/server.err";
import { AppNode } from "@/lib/types/nodes";
import exportTaskConfig from "./config";
import { LaunchBrowserTask } from "./launch-browser";
import { PageToHTML } from "./page-to-html";
import { Task, TaskType } from "@/lib/types/tasks";
import { Result } from "@/lib/types/errors";
import { ActionError } from "@/lib/types/errors/base.action.err";
import { ExtractTextFrmElement } from "./extract-text-from-element";

class TaskRegistryClass {
  private static instance: TaskRegistryClass;
  private tasks: Map<TaskType, Task>;

  private constructor() {
    this.tasks = new Map();
    this.registerTasks(LaunchBrowserTask, PageToHTML, ExtractTextFrmElement);
  }

  public static getInstance(): TaskRegistryClass {
    if (!TaskRegistryClass.instance) {
      TaskRegistryClass.instance = new TaskRegistryClass();
    }
    return TaskRegistryClass.instance;
  }

  public registerTasks(...task: Task[]) {
    for (const t of task)
      if (this.tasks.has(t.type))
        return err({
          message: `Task with type ${t.type} already exists`,
          type: ERROR_TYPES.TASK_NOT_FOUND_ERROR,
        });

    for (const t of task) this.tasks.set(t.type, t);

    return Ok({ success: true, message: "Task(s) added to the registry" });
  }

  public getTask(type: TaskType): Result<Task, ActionError> {
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

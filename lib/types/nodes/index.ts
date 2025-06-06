import { Node } from "@xyflow/react";

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export interface DataNode {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}
export interface AppNode extends Node {
  data: DataNode;
}

import { Node } from "@xyflow/react";
import { TaskInputs, TaskType } from "../tasks";

export type ParamProps = {
  param: TaskInputs;
  value: string;
  updateNodeParamProps: (newValue: string) => void;
  disabled?: boolean;
};

export interface DataNode {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: DataNode;
}


export type EnumValues<T> = T extends Record<string, infer U> ? U : never;
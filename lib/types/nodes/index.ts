import { Node } from "@xyflow/react";
import { LucideProps } from "lucide-react";

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum TaskParamType {
  STRING = "STRING",
}

export type TaskInputs = {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
};

export type Task = {
  type: TaskType;
  label: string;
  icon: (props: LucideProps) => JSX.Element;
  isEntryPoint: boolean;
  inputs?: TaskInputs[];
};

export type ParamProps = {
  param: TaskInputs;
  value: string;
  updateNodeParamProps: (newValue: string) => void;
};

export interface DataNode {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: DataNode;
}

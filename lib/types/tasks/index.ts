import { LucideProps } from "lucide-react";

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
}

export enum TaskParamType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

export type TaskInputs = {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
};

export type TaskOutputs = {
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
  outputs?: TaskOutputs[];
};

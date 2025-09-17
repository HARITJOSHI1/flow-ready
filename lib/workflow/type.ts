import { AppNode } from "../types/nodes";

export enum WORKFLOW_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];
export type InvalidInputsInWorkflow = {
  nodeId: string;
  inputs: string[];
};
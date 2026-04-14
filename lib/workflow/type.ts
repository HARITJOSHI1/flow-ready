import { AppNode } from "../types/nodes";

export enum WORKFLOW_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum EXECUTION_PHASE_STATUS {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
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
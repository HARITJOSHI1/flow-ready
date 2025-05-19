import { TWorkflow } from "@/db/schema";

export type AUTH_STATE_RESULT = {
  userId: string;
};

export type AUTH_SERVER_ACTION_ERROR = {
  type: "AUTH_CHECK_ERROR";
  code: number;
  message: string;
  shouldLog: boolean;
};

export type WORKFLOW_ACTION_RESULT = {
  workflows: TWorkflow[];
};

export type WORKFLOW_ACTION_NO_WORKFLOWS_ERROR = {
  type: "WORKFLOW_ACTION_NO_WORKFLOWS_ERROR";
  code: number;
  message: string;
  shouldLog: boolean;
};

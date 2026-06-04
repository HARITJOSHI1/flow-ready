"use client";

import {
  FlowToExecutionPlan,
  WorkflowExecutionPlanError,
} from "@/lib/executionPlan";
import { isErr } from "@/lib/helpers/global";
import { AppNode } from "@/lib/types/nodes";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useFlowValidation } from "../../validation/useFlowValidation";
import { toast } from "../../global/use-toast";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const result = useFlowValidation();

  const clearErrors = !isErr(result) ? result.data.clearErrors : undefined;
  const setInvalidInputs = !isErr(result) ? result.data.setInvalidInputs : undefined;

  const handleErrors = useCallback((err: WorkflowExecutionPlanError) => {
    switch (err.type) {
      case "NO_ENTRY_POINT":
        toast({
          title: "Workflow error",
          variant: "destructive",
          description: err.message,
          duration: 3000,
        });

        break;

      case "INVALID_INPUTS":
        toast({
          title: "Workflow error",
          variant: "destructive",
          description: err.message,
          duration: 3000,
        });

        setInvalidInputs?.(err?.data?.invalidElements!);
        break;

      default:
        toast({
          title: "Workflow error",
          variant: "destructive",
          description: "Something went wrong",
          duration: 3000,
        });

        break;
    }
  }, [setInvalidInputs]);


  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const result = FlowToExecutionPlan(nodes as AppNode[], edges);
    if (isErr(result)) {
      handleErrors(result.error);
      return null;
    }
    const { executionPlan } = result.data;

    clearErrors?.();
    return executionPlan;
  }, [toObject, handleErrors, clearErrors]);

  if (isErr(result)) return result.error;

  return generateExecutionPlan;
};

export default useExecutionPlan;

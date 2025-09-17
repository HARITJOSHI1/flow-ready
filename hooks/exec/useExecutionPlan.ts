'use client';

import { FlowToExecutionPlan } from "@/lib/executionPlan";
import { isErr } from "@/lib/helpers";
import { AppNode } from "@/lib/types/nodes";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const result = FlowToExecutionPlan(nodes as AppNode[], edges);
    if (isErr(result)) return;

    const { executionPlan } = result.data;
    return executionPlan;
  }, [toObject]);

  return generateExecutionPlan;
};

export default useExecutionPlan;

import { FlowToExecutionPlan } from "@/lib/executionPlan";
import { AppNode } from "@/lib/types/nodes";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
 const {toObject} = useReactFlow();

 const generateExecutionPlan = useCallback(() => {
    const {nodes, edges} = toObject();
    const result = FlowToExecutionPlan((nodes as AppNode[]), edges);

    return result;
 }, [toObject]);

 return generateExecutionPlan;
};

export default useExecutionPlan;
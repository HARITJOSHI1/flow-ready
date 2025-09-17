'use client';

import { Edge, getIncomers } from "@xyflow/react";
import { AppNode } from "./types/nodes";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "./workflow/type";
import { TaskRegistry } from "./workflow/task/registry";
import { Ok, err, isErr } from "./helpers";
import { Result } from "./types/errors";
import { ActionError } from "./types/errors/base.action.err";
import { ERROR_TYPES } from "./types/errors/server.err";

type TFlowToExecutionPlan = {
  executionPlan?: WorkflowExecutionPlan;
};

export const FlowToExecutionPlan = (
  nodes: AppNode[],
  edges: Edge[]
): Result<TFlowToExecutionPlan, ActionError> => {
  const entryPoint = nodes.find((nds) => {
    const task = TaskRegistry.getTask(nds.data.type);
    if (isErr(task)) return false;
    return task.data.isEntryPoint;
  });

  if (!entryPoint)
    return err({
      message: "TODO:Handle this error later",
      type: ERROR_TYPES.NO_EXECUTION_PLAN,
    });

  const plan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  /*
  
                          ALGO:

  1. To create exec plan iterate all the nodes and for each iteration 
  iterate the nodes with direct edges &  marked * only * those nodes as planned 
  whose dependencies over other nodes are resolved.

  2. Cut out of the loop if all the nodes r visited and added to exec plan.
  
  3. With each iteration check validity of the exec plan i.e. all nodes must have their
  inputs either from the other nodes output or from the user. If not no exec plan
  will be made.

  */

  // containes nodes which are yet to be resolved
  const planned = new Set<string>();
  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    // visit all the nodes that haven't been added to the planned set
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) continue;

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if(isErr(invalidInputs)) return err({
        message: "Something went wrong",
        type: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      });

      // Dependencies
      const incomers = getIncomers(currentNode, nodes, edges);
      if (invalidInputs.data.length > 0) {
        if (incomers.every((inc) => planned.has(inc.id))) {
          /* if there r incomers means that current node dependencies r not resolved
            which is an invalid input to the current node means this particular node
            has invalid inputs means workflow is invalid with non resolved dependencies.
          */

          if (process.env.NODE_ENV === "development") {
            console.error("Invalid inputs", currentNode.id, invalidInputs);
            return err({
              message: "TODO: ERROR 2",
              type: ERROR_TYPES.INVALID_INPUTS,
            });
          }
        } else continue;
      }

      // at this point the node is valid, add it to the exec plan
      nextPhase.nodes.push(currentNode);
    }

    for(const node of nextPhase.nodes) planned.add(node.id);
    plan.push(nextPhase);
  }

  return Ok({ executionPlan: plan });
};

const getInvalidInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
): Result<string[], ActionError> => {
  const task = TaskRegistry.getTask(node.data.type);
  if (isErr(task))
    return err({
      message:
        "No such task is added to registry. Please add it for to be an asset for developing workflows",
      type: ERROR_TYPES.TASK_NOT_FOUND_ERROR,
    });

  const invalidInputs = [];
  for (const inp of task.data.inputs) {
    // PART 1:

    // finding user input to the node
    const inputValue = node.data.inputs[inp.name];
    if (inputValue?.length > 0) continue;

    // PART 2:

    // here it means input is not provided by the user so we will check any incoming edge
    // is present or not as a node can recieve input from other nodes & user

    // all edges connected to the current node
    const incomingEdge = edges.filter((edg) => edg.target === node.id);

    // which edge is connected to the input
    const edgeConnectedToOutput = incomingEdge.find(
      (edg) => edg.targetHandle === inp.name
    );

    const requiredInputForValidWorkflow =
      inp.required &&
      edgeConnectedToOutput &&
      planned.has(edgeConnectedToOutput.source);


    // PART 3: Check for all valid cases first

    // case 1: valid input is present which is provided to the task that is planned
    if (requiredInputForValidWorkflow) continue;
    
    // case 2: if input not required then no manual or no incoming edge as an input should be present
    else if (!inp.required) {
      if (!edgeConnectedToOutput) continue;

      // case 3: if manual input not required by user but incoming edge as an input should be present
      if (edgeConnectedToOutput && planned.has(edgeConnectedToOutput.source))
        continue;
    }



    // PART 4: invalid input found
    invalidInputs.push(inp.name);
  }

  return Ok(invalidInputs);
};

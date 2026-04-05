import db from "@/db";
import { ExecutionPhase, executionPhase } from "@/db/schema";
import { isErr } from "@/lib/helpers/global";
import { AppNode } from "@/lib/types/nodes";
import { TaskParamType, TaskType } from "@/lib/types/tasks";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { eq } from "drizzle-orm";
import { Environment, ExcutorEnvironment } from "../types";
import { ExecutorRegistry } from "@/lib/workflow/executor/registry";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";


export const executePhase = async (phase: ExecutionPhase, environment: Environment, edges: Edge[]) => {

  const startedAt = new Date();
  const node = JSON.parse(phase.node!) as AppNode;

  setupEnvironmentForPhase(node, environment, edges);
  // update phase status to RUNNING
  await db.update(executionPhase)
    .set({
      status: "RUNNING",
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs)
    })
    .where(eq(executionPhase.id, phase.id));

  const creditsRequired = TaskRegistry.getTask(node.data.type as TaskType);
  if (isErr(creditsRequired)) return;

  // console.log(`Executing phase ${phase.name} with node ${node.data.type} with credits ${creditsRequired.data.credits}`);


  // Decrement user balance (with required credits)

  const success = await executor(phase, node, environment);

  const outputs = environment.phases[node.id].outputs

  await finalisePhase(phase.id, success, outputs);

  return success;
}


const setupEnvironmentForPhase = (node: AppNode, environment: Environment, edges: Edge[]) => {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };

  const task = TaskRegistry.getTask(node.data.type as TaskType);
  if (isErr(task)) return;

  const inputDefination = task.data.inputs;
  for (const input of inputDefination) {

    if (input.type === TaskParamType.BROWSER_INSTANCE) continue;

    const inputValue = node.data.inputs[input.name];

    // if provided by the user
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // if not then input is provided by the output of the connected node and get them


    // 1.  search the connected edge from current node.id
    const connectedEdge = edges.find((edge) => edge.target === node.id && edge.targetHandle === input.name);

    // theory: should not happen as validation done on client side before execution
    if (!connectedEdge) {
      console.error("Missing edge for input", input.name, "node id:", node.id);
      continue;
    }

    // 2. get and set the output of the connected node which is connected to current node's input
    const outputValue = environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!];

    // 3. then set the output to the input of the cuurent node
    environment.phases[node.id].inputs[input.name] = outputValue;

  }
}



const executor = async (phase: ExecutionPhase, node: AppNode, environment: Environment): Promise<boolean> => {
  const runFn = ExecutorRegistry[node.data.type as TaskType];
  if (!runFn) return false;


  const executorEnvironment: ExcutorEnvironment<any> = createExecutorEnvironment(node, environment);

  return await runFn(executorEnvironment);
}



const finalisePhase = async (phaseId: string, success: boolean, outputs: any) => {
  const finalStatus = success ? "COMPLETED" : "FAILED";

  await db.update(executionPhase)
    .set({
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs)
    })
    .where(eq(executionPhase.id, phaseId));
}



const createExecutorEnvironment = (node: AppNode, environment: Environment): ExcutorEnvironment<any> => {
  return {
    getInput: (inputName: string) => environment.phases[node.id]?.inputs[inputName],

    getBrowser: () => environment.browser,
    getPage: () => environment.page,

    setBrowser: (browser: Browser) => (environment.browser = browser),
    setPage: (page: Page) => (environment.page = page),
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    }
  }
}
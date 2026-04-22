import db from "@/db";
import { executionLogs, ExecutionPhase, executionPhase, userBalance } from "@/db/schema";
import { isErr } from "@/lib/helpers/global";
import { AppNode } from "@/lib/types/nodes";
import { TaskParamType, TaskType } from "@/lib/types/tasks";
import { ExecutorRegistry } from "@/lib/workflow/executor/registry";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { Edge } from "@xyflow/react";
import { and, eq, gte, sql } from "drizzle-orm";
import { Browser, Page } from "puppeteer";
import { Environment, ExcutorEnvironment } from "../types/executionEnv";
import { LogCollector } from "../types/log";
import { createLogCollector } from "./createLogCollector";


export const executePhase = async (phase: ExecutionPhase, environment: Environment, edges: Edge[], userId: string) => {

  const logCollector = createLogCollector();
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

  const taskInfo = TaskRegistry.getTask(node.data.type as TaskType);
  if (isErr(taskInfo)) return { success: false, creditsConsumed: 0 };


  // Decrement user balance (with required credits)

  let success = await decrementCredits(phase.userId, taskInfo.data.credits, logCollector);
  const creditsConsumed = success ? taskInfo.data.credits : 0;

  if (success)
    success = await executor(phase, node, environment, logCollector);

  const outputs = environment.phases[node.id].outputs

  await finalisePhase(phase.id, success, outputs, logCollector, creditsConsumed);
  return { success, creditsConsumed };
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



const executor = async (phase: ExecutionPhase, node: AppNode, environment: Environment, logCollector: LogCollector): Promise<boolean> => {
  const runFn = ExecutorRegistry[node.data.type as TaskType];
  if (!runFn) return false;

  const executorEnvironment: ExcutorEnvironment<any> = createExecutorEnvironment(node, environment, logCollector);
  return await runFn(executorEnvironment);
}



const finalisePhase = async (phaseId: string, success: boolean, outputs: any, logCollector: LogCollector, creditsConsumed: number) => {
  const finalStatus = success ? "COMPLETED" : "FAILED";

  await db.update(executionPhase)
    .set({
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      creditsConsumed,
    })
    .where(eq(executionPhase.id, phaseId));


  const logs = logCollector.getAll().map((log) => {
    return {
      ...log,
      workflowExecutionPhaseId: phaseId,
    }
  })

  if (logs.length > 0)
    await db.insert(executionLogs).values(logs);

}

const createExecutorEnvironment = (node: AppNode, environment: Environment, logCollector: LogCollector): ExcutorEnvironment<any> => {
  return {
    getInput: (inputName: string) => environment.phases[node.id]?.inputs[inputName],

    getBrowser: () => environment.browser,
    getPage: () => environment.page,

    setBrowser: (browser: Browser) => (environment.browser = browser),
    setPage: (page: Page) => (environment.page = page),
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },

    log: logCollector
  }
}


async function decrementCredits(
  userId: string, amount: number, logCollector: LogCollector
) {
  try {
    const [result] = await db.update(userBalance).set({
      credits: sql`${userBalance.credits} - ${amount}`,
    })
      .where(and(eq(userBalance.userId, userId), gte(userBalance.credits, amount)))
      .returning({ userId: userBalance.userId });

    if (!result) {
      logCollector.error("Insufficient credits to execute this phase");
      return false;
    }

    return true;

  } catch (error) {
    logCollector.error("Insufficient credits to execute this phase");
    return false;
  }
}
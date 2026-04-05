import db from "@/db";
import { executionPhase, workflow, workflowExecution } from "@/db/schema";
import ApiError from "@/lib/classes/Error/ApiError";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Environment } from "../types";
import { executePhase } from "./executePhase";
import { finaliseExecution } from "./finaliseExecution";
import { initializeExecutionPhaseStatus } from "./initializeExecutionPhaseStatus";
import { initializeWorkflowExecution } from "./initializeWorkflowExecution";
import { cleanupEnvironment } from "./cleanupEnvironment";
import { Edge } from "@xyflow/react";


export const executeWorkflow = async (executionId: string) => {
  const rows = await db
    .select()
    .from(workflowExecution)
    .innerJoin(
      executionPhase,
      eq(executionPhase.workflowExecutionId, executionId)
    )
    .where(eq(workflowExecution.id, executionId))
    .innerJoin(workflow, eq(workflow.id, workflowExecution.workflowId));

  if (rows.length === 0) {
    throw ApiError.notFound(
      "NOT_FOUND",
      404,
      "No execution found",
      false,
      {
        environment: process.env.NODE_ENV,
        functionName: "executeWorkflow()",
      }
    );
  }

  const execution = {
    workflow: rows[0].workflow,
    workflowExecution: rows[0].workflow_execution,
    phases: rows.map((r) => r.execution_phase),
  };

  // 1. Setup execution env
  const environment: Environment = {
    phases: {}
  }

  // 2. Initialize workflow execution to RUNNING
  await initializeWorkflowExecution(executionId, execution.workflow.id);


  // 3. Initialize all phases status
  await initializeExecutionPhaseStatus(execution.phases);

  let executionFailed = false;
  let creditsConsumed = 0;

  const flowDefinition = JSON.parse(execution.workflowExecution.defination!);
  const edges = (flowDefinition.edges || []) as Edge[];
  
  for (const phase of execution.phases) {
    // Execute each phase
    const phaseExecution = await executePhase(phase, environment, edges);

    if (!phaseExecution) {
      executionFailed = true;
      break;
    }
  }

  // Finalise the execution 
  await finaliseExecution(executionId, execution.workflow.id, executionFailed, creditsConsumed);

  // Cleanup environment
  await cleanupEnvironment(environment)


  revalidatePath("/workflows/runs");
}

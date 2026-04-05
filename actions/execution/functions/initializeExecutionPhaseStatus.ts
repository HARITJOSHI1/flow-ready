import db from "@/db";
import { ExecutionPhase, executionPhase } from "@/db/schema";
import { inArray } from "drizzle-orm";

export const initializeExecutionPhaseStatus = async (phases: ExecutionPhase[]) => {

  await db.update(executionPhase).set(
    {
      status: "PENDING",
    }
  ).where(inArray(executionPhase.id, phases.map((phase) => phase.id)));
}
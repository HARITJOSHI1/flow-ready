"use client";

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { setupServerActionHooks, createServerActionsKeyFactory } from "zsa-react-query";

const QueryKeyFactory = createServerActionsKeyFactory({
  getWorkflow: (workflowId: string) => ["get-workflow", workflowId] as string[],
  execution: (executionId: string) => ["execution", executionId] as string[],
  phaseDetails: (selectedPhase: string) => ["phaseDetails", selectedPhase] as string[]
});

const {
  useServerActionQuery,
  useServerActionMutation,
  useServerActionInfiniteQuery,
} = setupServerActionHooks({
  hooks: {
    useQuery,
    useMutation,
    useInfiniteQuery,
  },
  queryKeyFactory: QueryKeyFactory,
});

export {
  useServerActionInfiniteQuery,
  useServerActionMutation,
  useServerActionQuery,
  QueryKeyFactory,
};

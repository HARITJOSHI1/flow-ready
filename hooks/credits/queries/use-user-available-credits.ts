"use client";

import { getAvailableCredits } from "@/actions/billing/queries/getAvailableCredits";
import { QueryKeyFactory, useServerActionQuery } from "@/hooks/global/server-action-hooks";

export type UserAvailableCreditsResult = {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: number | undefined;
  error: Error | null;
};

export const useUserAvailableCredits = (): UserAvailableCreditsResult => {
  const query = useServerActionQuery(getAvailableCredits, {
    input: undefined,
    queryKey: QueryKeyFactory.userAvailableCredits(),
    refetchInterval: 30 * 1000,
  });

  const { isPending, isSuccess, data, error } = query;

  if (isPending) {
    return { isPending: true, isSuccess: false, isError: false, data: undefined, error: null };
  }

  if (data?.resolved === "error" || !data?.resolved) {
    return { isPending: false, isSuccess: false, isError: true, data: undefined, error: error ?? new Error("Failed to load credits") };
  }

  return {
    isPending: false,
    isSuccess: true,
    isError: false,
    data: data.result.balance,
    error: null,
  };
};

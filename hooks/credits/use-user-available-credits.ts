"use client";

import { getAvailableCredits } from "@/actions/billing/queries/getAvailableCredits";
import { QueryKeyFactory, useServerActionQuery } from "../global/server-action-hooks";


export const useUserAvailableCredits = () => {
    const { isPending, error, data, isSuccess } = useServerActionQuery(
        getAvailableCredits,
        {
            input: undefined,
            queryKey: QueryKeyFactory.userAvailableCredits(),
            refetchInterval: 30 * 1000
        }
    );

    if (data?.resolved === "error" || !data?.resolved) return { isPending, error };

    return { isPending, data: data.result, isSuccess };
};

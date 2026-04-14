"use client";
import { getWorkflowPhaseDetails } from "@/actions/phase/queries/getWorkflowPhaseDetails";
import { QueryKeyFactory, useServerActionQuery } from "@/hooks/global/server-action-hooks";

export const useQueryPhaseDetails = (
    selectedPhase: string
) => {
    const { isPending, isError, error, data, isSuccess } = useServerActionQuery(
        getWorkflowPhaseDetails,
        {
            input: {
                phaseId: selectedPhase,
            },
            enabled: !!selectedPhase,
            queryKey: QueryKeyFactory.phaseDetails(selectedPhase),
            staleTime: 0,
            refetchOnMount: "always",
        }
    );

    if (data?.resolved === "error" || !data?.resolved) return { isPending, isError, error };

    return { isPending, data: data.result, isSuccess };
};
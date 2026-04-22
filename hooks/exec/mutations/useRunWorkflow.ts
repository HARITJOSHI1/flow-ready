"use client";

import { runWorkflow } from "@/actions/execution/mutations/runWorkflow";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeyFactory, useServerActionMutation } from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";

export const useRunWorkflowMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(runWorkflow, {
      onSuccess: async () => {
        toast({
          title: "Execution started",
        });

        await queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.userAvailableCredits(),
        });

      },

      onError: (error) => {
        if (
          process.env.NODE_ENV === "development" ||
          process.env.NODE_ENV === "test"
        ) {
          console.error("@ERROR", error);
          return toast({
            title: "Error executing workflow",
            description: error.message,
            variant: "destructive",
          });
        }

        return toast({
          title: "Error executing workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

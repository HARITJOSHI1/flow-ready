"use client";

import { saveWorkflow } from "@/actions/workflows/mutations/saveWorkflow";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeyFactory, useServerActionMutation } from "../global/server-action-hooks";
import { toast } from "../global/use-toast";

export const useSaveWorkflowMutation = (workflowId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(saveWorkflow, {
      onSuccess: async (data) => {
        if (data.resolved === "error") {
          return toast({
            title: "Error saving workflow",
            description: data.error.message,
            variant: "destructive",
            duration: 3000
          });
        }

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.getWorkflow(workflowId),
        });

        toast({
          title: "Workflow saved successfully",
          duration: 3000
        });

      },

      onError: (error) => {
        return toast({
          title: "Error creating workflow",
          description: "Something went wrong",
          variant: "destructive",
          duration: 3000
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

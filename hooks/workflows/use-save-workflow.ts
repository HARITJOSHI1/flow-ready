"use client";

import { saveWorkflow } from "@/actions/workflows/update";
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
          });
        }

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.getWorkflow(workflowId),
        });

        toast({
          title: "Workflow saved successfully",
        });

      },

      onError: (error) => {
        return toast({
          title: "Error creating workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

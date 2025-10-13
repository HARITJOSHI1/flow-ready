"use client";

import { saveWorkflow } from "@/actions/workflows/mutations/saveWorkflow";
import { useQueryClient } from "@tanstack/react-query";
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";

export const useSaveWorkflowMutation = (workflowId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(saveWorkflow, {
      onSuccess: async (data) => {
        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.getWorkflow(workflowId),
        });

        toast({
          title: "Workflow saved successfully",
          duration: 3000,
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

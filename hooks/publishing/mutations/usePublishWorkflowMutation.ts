"use client";

import { publishWorkflow } from "@/actions/publishing/mutations/publishWorkflow";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeyFactory, useServerActionMutation } from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";

export const usePublishWorkflowMutation = (workflowId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(publishWorkflow, {
      onSuccess: async () => {
        toast({
          title: "Workflow published",
        });


        await queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.getWorkflow(workflowId),
        });

      },

      onError: (error) => {
        if (
          process.env.NODE_ENV === "development" ||
          process.env.NODE_ENV === "test"
        ) {
          console.error("@ERROR", error);
          return toast({
            title: "Error publishing workflow",
            description: error.message,
            variant: "destructive",
          });
        }

        return toast({
          title: "Error publishing workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

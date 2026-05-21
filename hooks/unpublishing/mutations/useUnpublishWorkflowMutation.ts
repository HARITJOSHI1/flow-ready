"use client";

import { useQueryClient } from "@tanstack/react-query";
import { QueryKeyFactory, useServerActionMutation } from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";
import { unpublishWorkflow } from "@/actions/unpublishing/mutation/unpublishWorkflow";

export const useUnpublishWorkflowMutation = (workflowId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(unpublishWorkflow, {
      onSuccess: async () => {
        toast({
          title: "Workflow unpublished",
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
            title: "Error unpublishing workflow",
            description: error.message,
            variant: "destructive",
          });
        }

        return toast({
          title: "Error unpublishing workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

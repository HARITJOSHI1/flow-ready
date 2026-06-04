"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";
import { removeWorkflowCron } from "@/actions/cron-scheduler/mutations/removeWorkflowCron";

export const useRemoveWorkflowCron = (workflowId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(removeWorkflowCron, {
      onSuccess: async () => {
        toast({
          title: "Schedule removed successfully",
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
            title: "Error removing the workflow",
            description: error.message,
            variant: "destructive",
          });
        }

        return toast({
          title: "Error removing the workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

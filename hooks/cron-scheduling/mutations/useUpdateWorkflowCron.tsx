"use client";

import { updateWorkflowCron } from "@/actions/cron-scheduler/mutations/updateWorkflowCron";
import { useQueryClient } from "@tanstack/react-query";
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";

export const useUpdateWorkflowCron = (workflowId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(updateWorkflowCron, {
      onSuccess: async (data) => {
        if (data.resolved === "success")
          toast({
            title:
              "Schedule updated successfully of worflow: " +
              data.result.workflow.id,
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
            title: "Error scheduling the workflow",
            description: error.message,
            variant: "destructive",
          });
        }

        return toast({
          title: "Error scheduling the workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

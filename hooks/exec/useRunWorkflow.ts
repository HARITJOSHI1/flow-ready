"use client";

import { useRouter } from "next/navigation";
import { useServerActionMutation } from "../global/server-action-hooks";
import { toast } from "../global/use-toast";
import { runWorkflow } from "@/actions/execution/mutations/runWorkflow";

export const useRunWorkflowMutation = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(runWorkflow, {
      onSuccess: async (data) => {
        toast({
          title: "Execution started",
        });

        if (data.resolved === "success") router.push(data.result.redirect_url);
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

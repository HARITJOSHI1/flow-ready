"use client";

import { createWorkflow } from "@/actions/workflows/mutations/createWorkflow";
import { useRouter } from "next/navigation";
import { useServerActionMutation } from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";

export const useCreateWorkflowMutation = () => {
  const router = useRouter();

  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(createWorkflow, {
      onSuccess: async (data) => {
        if (data.resolved === "error") {
          return toast({
            title: "Error creating workflow",
            description: data.error.message,
            variant: "destructive",
          });
        }

        toast({
          title: "Workflow created successfully",
          description: "You can now edit the workflow",
        });

        router.refresh();
        router.push(data.result.redirect_url);
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

"use client";

import { deleteWorkflow } from "@/actions/workflows";
import { useServerActionMutation } from "../global/server-action-hooks";
import { toast } from "../use-toast";
import { useRouter } from "next/navigation";

export const useDeleteWorkflowMutation = () => {
  const router = useRouter();

  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(deleteWorkflow, {
      onSuccess: async (data) => {
        if (data.resolved === "error") {
          return toast({
            title: "Error deleting workflow",
            description: data.error.message,
            variant: "destructive",
          });
        }

        toast({
          title: "Workflow deleted successfully",
        });
        router.refresh();
      },

      onError: (error) => {
        console.log("ERROR", error);
        return toast({
          title: "Error creating workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

"use client";

import { deleteWorkflow } from "@/actions/workflows/mutations/deleteWorkflow";
import { useServerActionMutation } from "../../global/server-action-hooks";
import { toast } from "../../global/use-toast";
import { useRouter } from "next/navigation";
import { isServerActionError } from "@/lib/types/react-query";

export const useDeleteWorkflowMutation = () => {
  const router = useRouter();

  const { mutate, isPending, isError, error, data, isSuccess } =
    useServerActionMutation(deleteWorkflow, {
      onSuccess: async (data) => {
        toast({
          title: "Workflow deleted successfully",
        });
        router.refresh();
      },

      onError: (error) => {
        const err = isServerActionError(error) ? error.error : undefined;

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

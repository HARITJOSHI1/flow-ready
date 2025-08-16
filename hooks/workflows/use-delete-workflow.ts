"use client";

import { deleteWorkflow } from "@/actions/workflows/delete";
import { useServerActionMutation } from "../global/server-action-hooks";
import { toast } from "../global/use-toast";
import { useRouter } from "next/navigation";
import { isServerActionError } from "@/lib/types/react-query";

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
        const err = isServerActionError(error) ? error.error : undefined;
        return toast({
          title: "Error deleting workflow",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  return { mutate, isPending, isError, error, data, isSuccess };
};

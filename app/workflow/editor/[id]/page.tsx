"use client";

import { useGetWorkflowQuery } from "@/hooks/workflows/use-get-workflow";
import Editor from "../_components/editor";
import { Loader2Icon } from "lucide-react";
import { ERROR_TYPES } from "@/lib/types/errors/server.err";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const { workflow, isPending, error } = useGetWorkflowQuery(id);

  if (error) {
    if (error.error.type === ERROR_TYPES.NOT_FOUND) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-lg text-red-600">Workflow not found</p>
        </div>
      );
    }
  }

  if (isPending)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2Icon size={30} className="animate-spin stroke-primary" />
      </div>
    );

  if (!workflow) return;
  return <Editor workflow={workflow} />;
};

export default Page;

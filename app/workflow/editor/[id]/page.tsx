"use client";

import ErrorWrapper from "@/components/error";
import { useGetWorkflowQuery } from "@/hooks/workflows/use-get-workflow";
import { Loader2Icon } from "lucide-react";
import Editor from "../_components/editor";
import { parseError } from "@/lib/utils";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const { workflow, isPending, error: failed } = useGetWorkflowQuery(id);

  if (failed) {
    // @ts-ignore
    if ((failed as Error)?.message.includes("devtools"))
      return (
        <ErrorWrapper
          title="Tanstack Devtools Error"
          subtitle="Error happened in development."
          statusCode={400}
          btnProps={{
            link: "/",
            text: "Go back to home",
          }}
        />
      );
    else if (failed.error.type === "NOT_FOUND") {
      const { parsed } = parseError(
        failed.error.extraDetails!,
        failed.error.message
      );
      return (
        <ErrorWrapper
          title="Sorry"
          statusCode={failed.error.code || 400}
          subtitle={parsed}
          btnProps={{
            link: "/dashboard",
            text: "Dashboard",
          }}
        />
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

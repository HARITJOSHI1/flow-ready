import Topbar from "@/app/workflow/_components/topbar/topbar";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewerWrapper from "./_components/execution-viewer-wrapper";

type Props = {
  params: {
    workflowId: string;
    executionId: string;
  };
};

const page = ({ params }: Props) => {
  const { workflowId, executionId } = params;
  return (
    <div className="flex flex-col h-screen w-ful overflow-hidden">
      <Topbar
        title="Worflow run details"
        subtitle={`Run ID: ${executionId}`}
        workflowId={workflowId}
        hideBtn
      />

      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full h-full justify-center items-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default page;

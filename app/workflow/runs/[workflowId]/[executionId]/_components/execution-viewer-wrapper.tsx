import { getWorkflowWithExecutionPhases } from "@/actions/execution/queries/getWorkflowWithExecutionPhases";
import ErrorWrapper from "@/components/common/error";
import { BaseErrReturnType } from "@/lib/types/errors/server/base";
import { parseError } from "@/lib/utils";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { auth } from "@clerk/nextjs/server";
import ExecutionViewer from "./execution-viewer";

type Props = {
  executionId: string;
};

const ExecutionViewerWrapper = async ({ executionId }: Props) => {
  const { userId } = auth();
  if (!userId) return <div>Unauthenticated</div>;

  const [data, err] = await getWorkflowWithExecutionPhases({
    executionId,
  });

  const _error = err as unknown as BaseErrReturnType<typeof ERROR_SCHEMA_v2>;

  if (_error || data?.resolved === "error" || data === null) {
    const { error } = _error;
    const { parsed } = parseError(error.extraDetails!, error.message);
    return (
      <ErrorWrapper
        title="Sorry"
        statusCode={error.code || 400}
        subtitle={parsed}
        btnProps={{
          link: "/dashboard",
          text: "Dashboard",
        }}
      />
    );
  }
  return (
    <div className="w-full h-full">
      <ExecutionViewer initData={data.result} />
    </div>
  );
};

export default ExecutionViewerWrapper;

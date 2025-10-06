import { getWorkflowWithExecutionPhases } from "@/actions/execution/queries/getWorkflowWithExecutionPhases";
import ErrorWrapper from "@/components/error";
import { BaseErrReturnType } from "@/lib/types/errors/server/base";
import { parseError } from "@/lib/utils";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { auth } from "@clerk/nextjs/server";

type Props = {
  executionId: string;
};

const ExecutionViewerWrapper = async ({ executionId }: Props) => {
  const { userId } = auth();
  if (!userId) return <div>Unauthenticated</div>;

  const [_, err] = await getWorkflowWithExecutionPhases({
    executionId,
  });

  const _error = err as unknown as BaseErrReturnType<typeof ERROR_SCHEMA_v2>;

  if (_error) {
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
  return <div>ExecutionViewerWrapper</div>;
};

export default ExecutionViewerWrapper;

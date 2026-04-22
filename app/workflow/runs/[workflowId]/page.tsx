import { getWorkflowExecutions } from '@/actions/execution/queries/getWorkflowWithExecutionPhases';
import { InboxIcon, Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import Topbar from '../../_components/topbar/topbar';

const WorkflowExecutionPage = ({ params }: { params: { workflowId: string } }) => {
    return (<div
        className="h-full w-full overflow-auto" >
        <Topbar
            workflowId={params.workflowId}
            hideBtn title="All runs"
            subtitle="List of all your workflow runs"
        />
        <Suspense fallback={<div className='flex h-full w-full items-center justify-center'><Loader2Icon className='animate-spin stroke-primary' size={50} /></div>}>
            <ExecutionsTable workflowId={params.workflowId} />
        </Suspense>
    </div>
    );
}

async function ExecutionsTable({ workflowId }: { workflowId: string }) {
    const [executions, error] = await getWorkflowExecutions({ workflowId });

    if (!executions || error || executions.resolved === "error") return <div>No Executions</div>;


    if (executions.result.workflow_execution.length === 0) {
        return (
            <div className="container w-full py-6 h-full">
                <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
                    <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center"><InboxIcon size={40} className="stroke-primary" /></div><div className="flex flex-col gap-1 text-center">
                        <p className="font-bold">
                            No runs have been triggered yet for this workflow </p>
                        <p className="text-sm text-muted-foreground">
                            You can trigger a new run in the editor page
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return <pre>{JSON.stringify(executions.result.workflow_execution, null, 4)}</pre>

}
export default WorkflowExecutionPage
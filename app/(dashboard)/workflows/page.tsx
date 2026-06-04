import { getUserWorkflows } from "@/actions/workflows/queries/getUserWorkflows";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, InboxIcon, PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CreateWorkflowDialog from "./_components/create-dialog";
import ListWorkflows from "./_components/list-workflows";
import { Workflow } from "@/db/schema";

const page = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your workflows here
          </p>
        </div>

        <CreateWorkflowDialog icon={<PlusIcon />} />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((_, index) => (
        <Skeleton key={index} className="h-32 w-full" />
      ))}
    </div>
  );
};

const UserWorkflows = async () => {
  const selectable: Partial<Record<keyof Workflow, boolean>> = {
    name: true,
    status: true,
    id: true,
    cron: true,
    creditsCost: true,
  };


  const [data] = await getUserWorkflows({ selectable });
  if (!data) return <ErrorAlert />;

  switch (data.resolved) {
    case "error":
      switch (data.error.type) {
        case "AUTH_CHECK_ERROR":
          redirect("/sign-in");
        case "NO_WORKFLOWS":
          return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
              <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                <InboxIcon size={40} className="stroke-primary" />
              </div>

              <div className="flex flex-col gap-1 text-center">
                <p className="font-bold">No workflows created yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Click the button below to create a new workflow
                </p>
                <CreateWorkflowDialog triggerText="Create your first workflow" />
              </div>
            </div>
          );
        default:
          return <ErrorAlert />;
      }

    case "success":
      if (data.result.status === "SUCCESS")
        return <ListWorkflows workflows={data.result.workflows} />;

      return <ErrorAlert />;
    default:
      return <ErrorAlert />;
  }
};

const ErrorAlert = () => (
  <Alert variant="destructive">
    <AlertCircle className="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Something went wrong! Please try again later.
    </AlertDescription>
  </Alert>
);
export default page;

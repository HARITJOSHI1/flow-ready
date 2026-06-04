import CustomDialogHeader from "@/components/header/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRemoveWorkflowCron } from "@/hooks/cron-scheduling/mutations/useRemoveWorkflowCron";
import { useUpdateWorkflowCron } from "@/hooks/cron-scheduling/mutations/useUpdateWorkflowCron";
import { toast } from "@/hooks/global/use-toast";
import { cn } from "@/lib/utils";
import CronExpressionParser from "cron-parser";
import cronstrue from "cronstrue";
import {
  CalendarIcon,
  ClockIcon,
  Loader2,
  TriangleAlertIcon
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SchedulerDialog({
  workflowId,
  cronStr,
}: {
  workflowId: string;
  cronStr: string | null;
}) {
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const [cron, setCron] = useState(cronStr || "");
  const { mutate: updateCron, isPending } =
    useUpdateWorkflowCron(workflowId);
  
  const { mutate: removeCron, isPending: isRemoving } =
    useRemoveWorkflowCron(workflowId);
  

  useEffect(() => {
    try {
      CronExpressionParser.parse(cron);
      const humanCronStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronStr);
    } catch (e) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = cronStr && cronStr.length > 0;

  const readableSavedCron = workflowHasValidCron && cronstrue.toString(cronStr);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            "text-sm p-0 h-auto",
            workflowHasValidCron ? "" : "text-yellow-300",
          )}
        >
          {workflowHasValidCron && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-3 w-3" />
              <span>{readableSavedCron}</span>
            </div>
          )}

          {!workflowHasValidCron && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3" /> Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in Asia/Kolkata
          </p>
          <Input
            placeholder="E.g. *****"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />

          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
              validCron && "border-tertiary  text-tertiary",
            )}
          >
            {validCron ? readableCron : "Not a valid cron expression"}
          </div>

          {workflowHasValidCron && (
            <DialogClose asChild>
              <div className="">
                <Button
                  className="w-full text-destructive border-destructive hover:text-destructive"
                  variant={"outline"}
                  disabled={
                    isPending || isRemoving
                  }
                  onClick={() => { 
                    toast({
                      title: "Removing...",
                      description: "Your schedule is being removed.",
                    })
                    removeCron({ id: workflowId });
                  }}
                >
                  Remove current schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={isPending || !validCron}
              onClick={() => {
                toast({
                  title: "Saving...",
                  description: "Your schedule is being saved.",
                });
                updateCron({ id: workflowId, cron });
              }}
            >
              {isPending ? <Loader2 /> : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

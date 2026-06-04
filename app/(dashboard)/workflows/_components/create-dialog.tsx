"use client";

import CreateWorkflowForm from "@/components/forms/workflows/create-workflow-form";
import CustomDialogHeader from "@/components/header/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Layers2Icon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  triggerText?: string;
  icon?: React.ReactNode;
};

const CreateWorkflowDialog = ({ triggerText, icon }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ? triggerText : icon}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Start building workflows to automate your work"
        />

        <div className="p-6">
          <CreateWorkflowForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

type Props = {
  triggerText?: string;
  icon?: React.ReactNode;
};

const CreateWorkflowDialog = ({ triggerText, icon }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          {triggerText ? triggerText : icon}
        </Button>
      </DialogTrigger>

      <DialogContent className="px-0 flex flex-col gap-4 justify-center items-center">
        <DialogHeader>
          <DialogTitle>Create Workflow</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;

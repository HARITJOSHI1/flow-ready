"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkflowMutation } from "@/hooks/workflows/mutations/use-delete-workflow";
import { Loader2 } from "lucide-react";

type Props = {
  title: string;
  description: string | ReactNode;
  setOpen: (open: boolean) => void;
  open: boolean;
  itemToDelete: string;
};

const ShowAlert = ({
  title,
  description,
  setOpen,
  open,
  itemToDelete,
}: Props) => {
  const [confirmText, setConfirmText] = useState("");
  const { mutate, isPending, isSuccess } = useDeleteWorkflowMutation();

  useEffect(() => {
    if (isSuccess) setConfirmText("");
  }, [isSuccess]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
            <div className="flex flex-col py-4 gap-2">
              <p>
                In order to delete this workflow type <b>{itemToDelete}</b> to
                confirm.
              </p>
            </div>

            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel> Cancel </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== itemToDelete || isPending}
            onClick={(e) => {
              mutate({ name: itemToDelete });
            }}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowAlert;

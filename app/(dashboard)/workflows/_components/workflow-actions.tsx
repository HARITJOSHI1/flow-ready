"use client";

import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import ShowAlert from "./show-alert";

type Props = {
  workflowName: string;
};

const WorkflowActions = ({ workflowName }: Props) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
      <ShowAlert
        title="Are you absolutely sure?"
        description={`If you delete this workflow after that you will not be able to recover it.`}
        itemToDelete={workflowName}
        setOpen={setShowDeleteAlert}
        open={showDeleteAlert}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More actions">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={16} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="p-2 text-center">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => setShowDeleteAlert(!showDeleteAlert)}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WorkflowActions;

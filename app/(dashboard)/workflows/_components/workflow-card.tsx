"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TWorkflow } from "@/db/schema";
import { WORKFLOW_STATUS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FileTextIcon, PlayIcon, ShuffleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import WorkflowActions from "./workflow-actions";

type Props = {
  workflow: TWorkflow;
};

const statusColor = {
  [WORKFLOW_STATUS.DRAFT]: "bg-primary text-yellow-600",
  [WORKFLOW_STATUS.PUBLISHED]: "bg-yellow",
};

const WorkflowCard = ({ workflow }: Props) => {
  const isDraft = workflow.status === "DRAFT";

  return (
    <Card className="border border-seperate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              statusColor[workflow.status]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="w-5 h-5 text-white" />
            ) : (
              <PlayIcon className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflows/editor/${workflow.id}`}
                className="flex items-center hover:underline text-wrap"
              >
                <p className="break-all">{workflow.name} </p>
              </Link>
              {isDraft && (
                <span className="text-xs text-yellow-800 px-2 ml-2 py-0.5 font-medium bg-muted rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href={`/workflows/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>

          <WorkflowActions workflowName={workflow.name} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;

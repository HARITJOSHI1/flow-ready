"use client";

import React from "react";
import WorkflowCard from "./workflow-card";
import { TWorkflow } from "@/db/schema";

type Props = {
  workflows: TWorkflow[];
};

const ListWorkflows = ({ workflows }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export default ListWorkflows;

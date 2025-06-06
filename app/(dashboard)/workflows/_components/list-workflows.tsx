"use client";

import React, { memo } from "react";
import WorkflowCard from "./workflow-card";
import { Workflow } from "@/db/schema";

type Props = {
  workflows: Workflow[];
};

const ListWorkflows = memo(({ workflows }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
});

export default ListWorkflows;

"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { isErr } from "@/lib/helpers";
import { TaskType } from "@/lib/types/tasks";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AccordionContent } from "@radix-ui/react-accordion";
import React from "react";

const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-seperate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-4">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry.getTask(taskType);
  if (isErr(task)) return;

  const onDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    type: TaskType
  ) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";

    // Add a class to indicate that this is being dragged
    e.currentTarget.classList.add("dragging");
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center w-full gap-2 border hover:bg-blend-difference"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
    >
      <div className="flex gap-2">
        <task.data.icon size={20} />
        <span>{task.data.label}</span>
      </div>
    </Button>
  );
};

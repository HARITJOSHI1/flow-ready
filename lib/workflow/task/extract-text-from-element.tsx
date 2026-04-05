import { Task, TaskParamType, TaskType } from "@/lib/types/tasks";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFrmElement = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract Text From Element",
  icon: (props: LucideProps) => (
    <TextIcon {...props} className="stroke-primary dark:stroke-primary-foreground" />
  ),

  credits: 2,

  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      varaint: "textarea"
    },

    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,

  outputs: [
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies Task;

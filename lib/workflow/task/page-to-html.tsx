
import { Task, TaskParamType, TaskType } from "@/lib/types/tasks";
import { GlobeIcon, LucideProps } from "lucide-react";


export const PageToHTML: Task = {
  type: TaskType.PAGE_TO_HTML,
  label: "Extract Page data to HTML format",
  icon: (props: LucideProps) => (
    <GlobeIcon {...props} className="stroke-rose-400" />
  ),

  isEntryPoint: false,
  inputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],

  outputs: [
    {
      name: "HTML", 
      type: TaskParamType.STRING,
    },

    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};

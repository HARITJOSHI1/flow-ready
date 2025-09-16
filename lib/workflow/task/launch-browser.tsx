
import { Task, TaskParamType, TaskType } from "@/lib/types/tasks";
import { GlobeIcon, LucideProps } from "lucide-react";


export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon {...props} className="stroke-primary dark:stroke-primary-foreground" />
  ),

  credits: 5, 

  isEntryPoint: true,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "eg: https://example.com",
      required: true,
      hideHandle: false,
    },
  ],

  outputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies Task<TaskType.LAUNCH_BROWSER>;

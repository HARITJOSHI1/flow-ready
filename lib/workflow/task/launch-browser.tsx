import { TaskParamType, TaskType } from "@/lib/types/nodes";
import { GlobeIcon, LucideProps } from "lucide-react";
import { Task } from "@/lib/types/nodes";

export const LaunchBrowserTask: Task = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon {...props} className="stroke-pink-400" />
  ),

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
};

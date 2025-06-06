import { TaskType } from "@/lib/types/nodes";
import { GlobeIcon, LucideProps } from "lucide-react";
import { Task } from "./registry";

export const LaunchBrowserTask: Task = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon {...props} className="stroke-pink-400" />
  ),

  isEntryPoint: true,
};

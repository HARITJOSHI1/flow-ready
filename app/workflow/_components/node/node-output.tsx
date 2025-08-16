
import { TaskOutputs } from "@/lib/types/tasks";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const NodeOutputs = ({ children }: Props) => {
  return <div className="flex flex-col divide gap-1">{children}</div>;
};

const NodeOutput = ({ output }: { output: TaskOutputs }) => {
  return <div>{output.name}</div>;
};

export { NodeOutput, NodeOutputs };

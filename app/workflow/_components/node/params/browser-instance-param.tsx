import { TaskInputs } from "@/lib/types/tasks";
import React from "react";

type Props = {
  value: string;
  param: TaskInputs;
  updateNodeParamProps: (newValue: string) => void;
};

const BroweserInstanceParam = ({ param }: Props) => {
  return <p className="text-xs">{param.name}</p>;
};

export default BroweserInstanceParam;

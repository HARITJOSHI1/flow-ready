"use client";

import { Input } from "@/components/ui/input";
import { ParamProps } from "@/lib/types/nodes";
import { Label } from "@radix-ui/react-label";
import { useId, useState } from "react";

const StringParam = ({ param, value, updateNodeParamProps }: ParamProps) => {
  const id = useId();
  const [internalVal, setInternalVal] = useState(value);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label className="text-xs flex" htmlFor={id}>
        {param.name}
        {param.required && <span className="text-red-400 px-2">*</span>}
      </Label>
      <Input
        value={internalVal}
        onBlur={(e) => updateNodeParamProps(e.target.value)}
        id={id}
        className="w-full text-xs"
        placeholder="Enter a string value"
        onChange={(e) => setInternalVal(e.target.value)}
      />
      {param.helperText && (
        <p className="text-xs text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;

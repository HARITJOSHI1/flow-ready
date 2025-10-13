"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFlowValidation } from "@/hooks/validation/useFlowValidation";
import { isErr } from "@/lib/helpers/global";
import { ParamProps } from "@/lib/types/nodes";
import { Label } from "@radix-ui/react-label";
import { useEffect, useId, useState } from "react";

const StringParam = ({
  param,
  value,
  updateNodeParamProps,
  disabled,
}: ParamProps) => {
  const id = useId();
  const [internalVal, setInternalVal] = useState(value);
  const result = useFlowValidation();
  useEffect(() => {
    setInternalVal(value);
  }, [value]);
  
  if (isErr(result)) return null;

  const { clearErrors } = result.data;


  const Component = param.varaint === "textarea" ? Textarea : Input;

  return (
    <div className="space-y-1 p-1 w-full">
      <Label className="text-xs flex" htmlFor={id}>
        {param.name}
        {param.required && <span className="text-red-400 px-2">*</span>}
      </Label>
      <Component
        value={internalVal}
        onBlur={(e) => updateNodeParamProps(e.target.value)}
        id={id}
        className="w-full text-xs" // Changed from "text-xs" to "text-xs"
        placeholder="Enter a string value"
        onChange={(e) => {
          clearErrors();
          setInternalVal(e.target.value);
        }}
        rows={param.varaint === "textarea" ? 5 : undefined}
        disabled={disabled}
      />
      {param.helperText && (
        <p className="text-xs text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;

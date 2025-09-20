import {
  FlowValidationContext,
  FlowValidationContextType,
} from "@/components/contexts/flow-validation-context";
import { Ok, err } from "@/lib/helpers";
import { Result } from "@/lib/types/errors";
import { ActionError } from "@/lib/types/errors/base.action.err";
import { useContext } from "react";

export const useFlowValidation = (): Result<
  FlowValidationContextType,
  ActionError
> => {
  const context = useContext(FlowValidationContext);
  if (!context)
    return err({
      message: "useFlowValidation() must be used within FlowValidationContext",
      type: "REACT_CONTEXT_ERROR",
    });

  return Ok(context);
};

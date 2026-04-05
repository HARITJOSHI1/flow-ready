import { InvalidInputsInWorkflow } from "@/lib/workflow/type";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type FlowValidationContextType = {
  invalidInputs: InvalidInputsInWorkflow[];
  setInvalidInputs: Dispatch<SetStateAction<InvalidInputsInWorkflow[]>>;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export const FlowValidationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [invalidInputs, setInvalidInputs] = useState<InvalidInputsInWorkflow[]>(
    []
  );

  const clearErrors = () => {
    setInvalidInputs([]);
  };

  return (
    <FlowValidationContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors,
      }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
};

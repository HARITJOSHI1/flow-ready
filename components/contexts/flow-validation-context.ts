import { InvalidInputsInWorkflow } from "@/lib/workflow/type";
import { Dispatch, SetStateAction } from "react";

type FlowValidationContextType = {
    invalidInputs: InvalidInputsInWorkflow[];
    setInvalidInputs: Dispatch<SetStateAction<InvalidInputsInWorkflow[]>>;
}
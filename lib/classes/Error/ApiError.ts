import { ErrorKeys } from "@/lib/types/errors/server/base";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { z } from "zod";
import { IErrorClassProps } from "./interface/IErrorClass";


type InferredSchema = z.infer<typeof ERROR_SCHEMA_v2>;
type ExtractedDetails = Pick<InferredSchema, "extraDetails">["extraDetails"];

class ApiError<C extends ErrorKeys, D = ExtractedDetails, O = any>
  extends Error
  implements IErrorClassProps<C, D, O>
{
  public type: C;
  public statusCode: number;
  public message: string;
  public details?: D;
  public orginalError?: O;
  public shouldAddStack?: boolean;
  public name: string;

  constructor(
    type: C,
    statusCode: number,
    message: string,
    shouldAddStack?: boolean,
    name: string = "ApiError",
    details?: D,
    orginalError?: O
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    this.orginalError = orginalError;
    this.shouldAddStack = shouldAddStack;
    this.name = name;

    if (shouldAddStack) {
      this.stack = new Error().stack;
    } 
  }

  static auth<T extends ExtractedDetails>(
    type: ErrorKeys,
    statusCode: number = 500,
    message: string,
    shouldAddStack?: boolean,
    details?: T
  ) {
    return new ApiError(
      type,
      statusCode,
      message,
      shouldAddStack,
      "ApiError",
      details
    );
  }

  static notFound<T extends ExtractedDetails>(
    type: ErrorKeys,
    statusCode: number = 500,
    message: string,
    shouldAddStack?: boolean,
    details?: T
  ) {
    return new ApiError(
      type,
      statusCode,
      message,
      shouldAddStack,
      "ApiError",
      details
    );
  }

  static internal<T extends ExtractedDetails>(
    type: ErrorKeys,
    statusCode: number = 500,
    message: string,
    shouldAddStack?: boolean,
    details?: T
  ) {
    return new ApiError(
      type,
      statusCode,
      message,
      shouldAddStack,
      "ApiError",
      details
    );
  }

  static uncaught<T extends ExtractedDetails>(
    type: ErrorKeys,
    statusCode: number = 500,
    message: string,
    shouldAddStack?: boolean,
    details?: T
  ) {
    return new ApiError(
      type,
      statusCode,
      message,
      shouldAddStack,
      "ApiError",
      details
    );
  }
}

export default ApiError;

import { IErrorClassProps } from "./interface/IErrorClass";
import { randomUUID } from "crypto";
import { ErrorKeys } from "@/lib/types/errors/server/base";

// GOOD TO HAVE: Add a log drain to stream logs to third party for error handling on a big
// team level


type UnknownErrorDetails = {
  info?: string;
  [key: string]: any;
};

type RejectionType = "unhandledRejection" | "uncaughtException";
type UnknownErrContext = {
  id: string;
  originalError?: unknown;
  timestamp: string;
  stack?: string;
  name?: string;
  details?: unknown;
  type: RejectionType;
};

type UnknownErrorCallbackFn = (context?: UnknownErrContext) => void;

class UnknownError<
    C = ErrorKeys,
    D = UnknownErrorDetails,
    O = any
  >
  extends Error
  implements IErrorClassProps<C, D, O>
{
  private static instance: UnknownError;
  private ErrorMapper: Map<string, UnknownErrorCallbackFn[]>;

  constructor(
    public type: C,
    public statusCode: number = 500,
    public message: string,
    public details?: D,
    public orginalError?: O,
    public shouldAddStack?: boolean,
    public name: string = "UnknownError"
  ) {
    super(message);
    this.ErrorMapper = new Map();
    if (shouldAddStack) this.stack = new Error().stack;
    else this.stack = undefined;
  }

  static getInstance(): UnknownError {
    if (!UnknownError.instance) {
      UnknownError.instance = new UnknownError(
        "UNKNOWN_ERROR",
        500,
        "An unknown error occurred",
        {},
        undefined,
        true
      );
    }
    return UnknownError.instance;
  }

  static initialize() {
    const handler = UnknownError.getInstance();

    // Handle unhandled promise rejections
    if (typeof process !== "undefined") {
      process.on("unhandledRejection", (reason, promise) => {
        console.error("Unhandled Promise Rejection:", reason);

        const id = randomUUID();
        handler.handleUncaughtError(reason, "unhandledRejection", id);
      });

      // Handle uncaught exceptions
      process.on("uncaughtException", (error) => {
        console.error("Uncaught Exception:", error);

        const id = randomUUID();
        handler.handleUncaughtError(error, "uncaughtException", id);

        if (process.env.NODE_ENV === "production") process.exit(1);
      });
    }
  }

  private handleUncaughtError(error: any, type: RejectionType, errId: string) {
    // Get Context
    const { context } = this.createContext(error, type, errId);
    console.info(`[${type.toUpperCase()}]`, context);

    // Add error to cb multiple error can be generated during "unhandledRejection"
    if (!this.ErrorMapper.has(errId) && type === "unhandledRejection")
      this.ErrorMapper.set(errId, [this.errorCallbackHandler(context)]);
    else {
      const cbArr = this.ErrorMapper.get(errId)!;
      cbArr.push(this.errorCallbackHandler(context));
    }

    // Execute custom callbacks
    this.executeCb();
  }

  private async executeCb() {
    const allCbArr = Object.values(this.ErrorMapper).map(
      (val) => val as UnknownErrorCallbackFn[]
    );
    const cbArr = allCbArr.flat();

    const tasks = cbArr.map((cb: UnknownErrorCallbackFn) => {
      return Promise.resolve().then(
        () => cb() as unknown as UnknownErrorCallbackFn
      );
    });

    try {
      const executedPromises = await Promise.all(tasks);
      if (executedPromises.length)
        console.info("All errors are being executed from their queue");
    } catch (err) {
      console.error("Error in error callback:", err);
    }
  }

  private errorCallbackHandler(
    context: UnknownErrContext
  ): UnknownErrorCallbackFn {
    return (_context = context) => {
      
      // STREAM IT IN A LOG DRAIN......
    };
  }

  private createContext(error: any, type: RejectionType, errId: string) {
    const context = {
      id: errId,
      originalError: error || this.orginalError,
      timestamp: new Date().toISOString(),
      stack: this?.stack,
      name: error?.name || this.name,
      details: this.details,
      type,
    };

    return { context };
  }
}

export default UnknownError;

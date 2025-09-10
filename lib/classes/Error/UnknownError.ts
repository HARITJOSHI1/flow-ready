import { ERROR_TYPES } from "@/lib/types/errors/server.err";
import { IErrorClassProps } from "../interface/IErrorClass";

type UnknownErrorDetails = {
  info?: string;
  [key: string]: any;
};

class UnknownError<
    C = keyof typeof ERROR_TYPES,
    D = UnknownErrorDetails,
    O = any
  >
  extends Error
  implements IErrorClassProps<C, D, O>
{
  private errorCallbacks: ((error: any) => void)[] = [];
  private static instance: UnknownError;

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
        handler.handleUncaughtError(reason, "unhandledRejection");
      });

      // Handle uncaught exceptions
      process.on("uncaughtException", (error) => {
        console.error("Uncaught Exception:", error);
        handler.handleUncaughtError(error, "uncaughtException");

        if (process.env.NODE_ENV === "production") process.exit(1);
      });
    }
  }

  private handleUncaughtError(error: any, type: string) {
    // Log with context
    console.error(`[${type.toUpperCase()}]`, {
      originalError: error,
      timestamp: new Date().toISOString(),
      stack: error?.stack,
    });

    // Execute custom callbacks
    this.errorCallbacks.forEach((callback) => {
      try {
        callback({ type, originalError: error });
      } catch (err) {
        console.error("Error in error callback:", err);
      }
    });
  }
}

export default UnknownError;

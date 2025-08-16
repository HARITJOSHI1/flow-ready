import { RESPONSE_STATUS } from "../../types/server";

class ApiError<T> extends Error {
  public status: RESPONSE_STATUS;
  public details: T;
  public stack?: string;
  public shouldAddStack?: boolean;
  public shouldLog?: boolean;
  public name = "ApiError";

  constructor(
    status: RESPONSE_STATUS,
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean
  ) {
    super();
    this.status = status;
    this.details = details;
    this.shouldLog = shouldLog;

    if (shouldAddStack) this.stack = new Error().stack;
    this.stack = undefined;
  }

  static auth<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean
  ) {
    return new ApiError(
      RESPONSE_STATUS.UNAUTHORIZED,
      details,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static validation<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean
  ) {
    return new ApiError(
      RESPONSE_STATUS.BAD_REQUEST,
      details,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static notFound<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean
  ) {
    return new ApiError(
      RESPONSE_STATUS.NOT_FOUND,
      details,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static internal<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean
  ) {
    return new ApiError(
      RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      details,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static uncaught<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean
  ) {
    return new ApiError(
      RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      details,
      stack,
      shouldAddStack,
      shouldLog
    );
  }
}

export default ApiError;

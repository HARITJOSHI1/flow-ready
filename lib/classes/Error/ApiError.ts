import { RESPONSE_STATUS } from "../../types/server";

class ApiError<T> extends Error{
  public status: RESPONSE_STATUS;
  public details: T;
  public shouldAddStack?: boolean;
  public shouldLog?: boolean;
  public name = "ApiError";
  public code = 500;

  constructor(
    status: RESPONSE_STATUS,
    details: T,
    code: number,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean,
  ) {
    super();
    this.status = status;
    this.details = details;
    this.shouldLog = shouldLog;
    this.code = code;

    if (shouldAddStack) this.stack = new Error().stack;
    this.stack = undefined;
  }

  static auth<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean,
    code: number = 401
  ) {
    return new ApiError(
      RESPONSE_STATUS.UNAUTHORIZED,
      details,
      code,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static validation<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean,
    code: number = 400
  ) {
    return new ApiError(
      RESPONSE_STATUS.BAD_REQUEST,
      details,
      code,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static notFound<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean,
    code: number = 404
  ) {
    return new ApiError(
      RESPONSE_STATUS.NOT_FOUND,
      details,
      code,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static internal<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean,
    code: number = 500
  ) {
    return new ApiError(
      RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      details,
      code,
      stack,
      shouldAddStack,
      shouldLog
    );
  }

  static uncaught<T>(
    details: T,
    stack?: string,
    shouldAddStack?: boolean,
    shouldLog?: boolean,
    code: number = 500
  ) {
    return new ApiError(
      RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      details,
      code,
      stack,
      shouldAddStack,
      shouldLog
    );
  }
}

export default ApiError;

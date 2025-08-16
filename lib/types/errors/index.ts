import { ActionError } from "./base.action.err";

export type Result<T, E> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

export type AsyncResult<T, E = ActionError> = Promise<Result<T, E>>;
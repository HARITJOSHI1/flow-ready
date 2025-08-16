import { ActionError, BaseErrReturnType } from "../errors/base.action.err";


export type ServerActionError<TErrorData> = BaseErrReturnType & {
  resolved: "error";
  error: TErrorData;
};

export type RetryFunction<TError> = (
  failureCount: number,
  error: ServerActionError<TError>
) => boolean;

export type RetryDelayFunction<TError> = (
  attemptIndex: number,
  error?: ServerActionError<TError>
) => number;

export function isServerActionError<
  TError extends ActionError = ActionError
>(value: unknown): value is ServerActionError<TError> {
  return (
    !!value &&
    typeof value === "object" &&
    (value as any).resolved === "error" &&
    "error" in (value as any)
  );
}

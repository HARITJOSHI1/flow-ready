export type ErrorNames = "ZodError" | "ApiError" | "PostgresError" | "UnknownError"; 


export interface IErrorClassProps<C = any, D = any, O = any> {
  type: C;
  statusCode: number;
  message: string;
  details?: D;
  orginalError?: O;
  shouldAddStack?: boolean;
  name: string;
}

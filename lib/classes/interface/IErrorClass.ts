export type ErrorNames = "ZodError" | "ApiError" | "PostgresError"; 


export interface IErrorClassProps<C = any, D = any, O = any> {
  type: C;
  statusCode: number;
  message: string;
  details?: D;
  orginalError?: O;
  shouldAddStack?: boolean;
  shouldLog?: boolean;
  name: string;
}

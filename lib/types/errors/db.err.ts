import { PgCodeEnum } from "@/db/postgres/constants";
import { Error as PgError } from "postgres";

export type PostgresError = PgError & {
  field: string;
  column?: string;
  constraint?: string;
};

export type PgHandlerDetails = {
  field: string;
  constraint: string;
  column: string;
  pgCode: string;
};

export type PostgressErrHandler = {
  code: keyof typeof PgCodeEnum;
  message: string;
  details?: Partial<PgHandlerDetails>;
  statusCode?: number;
};

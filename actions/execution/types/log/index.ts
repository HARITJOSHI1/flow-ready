import { ExecutionLog } from "@/db/schema";

export const LogLevels = ["info", "error"] as const;
export type LogLevel = typeof LogLevels[number];

type TLog = ExecutionLog & {
    logLevel: LogLevel;
}

export type Log = Omit<TLog, "id" | "workflowExecutionPhaseId">

export type LogFn = (message: string) => void;

export type LogCollector = {
    getAll(): Log[];
} & {
    [k in LogLevel]: LogFn
};
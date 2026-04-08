import { Log, LogCollector, LogFn, LogLevel, LogLevels } from "../types/log";

export const createLogCollector = (): LogCollector => {
    const logs: Log[] = [];
    const logFns = {} as Record<LogLevel, LogFn>;

    LogLevels.forEach((level) => {
        logFns[level] = (message: string) => {
            logs.push({
                message,
                logLevel: level,
                timestamp: new Date()
            });
        }
    })


    return {
        getAll: () => {
            return logs;
        },
        ...logFns
    }
}
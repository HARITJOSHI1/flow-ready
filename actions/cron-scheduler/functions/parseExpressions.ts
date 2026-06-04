import { err, Ok } from "@/lib/helpers/global";
import { CronExpressionParser } from "cron-parser";

export function parseExpressions(cron: string) {
  try {
    const interval = CronExpressionParser.parse(cron, { tz: "Asia/Kolkata" });
    return Ok(interval);
  } catch (error) {
    return err({ type: "NO_DATA", message: (error as Error)?.message });
  }
}

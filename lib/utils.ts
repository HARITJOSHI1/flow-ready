import { envSchema } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ErrorDetails } from "./types/errors/client/error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseError(
  details: ErrorDetails,
  message: string
): { parsed: string } {
  const { environment, functionName } = details;

  if (environment === "production")
    return { parsed: "An unexpected error occurred. Please contact support." };

  let envLabel = environment === "development" ? "Dev" : "Test";
  return { parsed: `[${envLabel}] Error in ${functionName}: ${message}` };
}

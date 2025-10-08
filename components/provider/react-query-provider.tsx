"use client";

import ErrorBoundary from "@/lib/errorBoundry";
import { isServerActionError } from "@/lib/types/react-query";
import { RESPONSE_STATUS } from "@/lib/types/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const createRetryFunction = () => (failureCount: number, error: unknown) => {
  const err = isServerActionError(error) ? error.error : undefined;
  const statusCode = typeof err?.code === "number" ? err.code : undefined;

  if (typeof statusCode === "number") {
    if (statusCode === 408 || statusCode === 429) return failureCount < 2;
    if (statusCode >= 400 && statusCode < 500) return false;
    if (statusCode >= 500) return failureCount < 3;
  }

  if (err?.status === RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
    return failureCount < 3;

  return failureCount < 3;
};

// Optimized retry delay with jitter
const createRetryDelay = () => (attemptIndex: number) => {
  const baseDelay = Math.min(1000 * 2 ** attemptIndex, 30000);
  const jitter = Math.random() * 0.1 * baseDelay;
  return baseDelay + jitter;
};

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000,
          retry: createRetryFunction(),
          retryDelay: createRetryDelay(),
          refetchOnReconnect: "always",
          refetchOnMount: true,

          // Network optimization
          networkMode: "online",

          // Memory optimization
          structuralSharing: true,

          // Prevent unnecessary background updates
          refetchInterval: false,
          refetchIntervalInBackground: false,
        },

        mutations: {
          retry: (failureCount, error) => {
            // Only retry mutations on network errors
            if (!error && failureCount < 2) return true;
            return false;
          },
          retryDelay: createRetryDelay(),
          networkMode: "online",

          // Server actions handle their own optimistic updates
          throwOnError: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
      )}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;

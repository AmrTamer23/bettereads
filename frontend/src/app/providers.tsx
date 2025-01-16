"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NuqsAdapter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </NuqsAdapter>
);

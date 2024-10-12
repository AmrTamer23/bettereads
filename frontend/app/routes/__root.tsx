import {
  createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { Toaster } from "~/components/ui/toaster";
import * as React from "react";
import "../main.css";
import { Provider } from "jotai";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack Start Starter",
    },
  ],
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Provider>
        <Outlet />
        <Toaster />
      </Provider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
      </style>
      <Head>
        <Meta />
      </Head>
      <Body className="bg-background">
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}

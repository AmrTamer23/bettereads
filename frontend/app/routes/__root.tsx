// app/routes/__root.tsx
import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { Toaster } from "~/components/ui/toaster";
import * as React from "react";
import "../main.css";
import { Provider } from "jotai";

export const Route = createRootRoute({
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
        url('https://fonts.googleapis.com/css2?family=PT+Mono&display=swap');
      </style>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}

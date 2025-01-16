import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "@fontsource/inknut-antiqua";
import "./globals.css";
import { Providers } from "./providers";
import "@fontsource/merriweather";
import "@fontsource-variable/dm-sans";
import "@fontsource/monaspace-neon";

export const metadata: Metadata = {
  title: "BetterReads",
  description: "Better not goodreads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

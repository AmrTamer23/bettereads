import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "@fontsource/inknut-antiqua";
import "./globals.css";

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
    <html lang="en">
      <body className={` antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

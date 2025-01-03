import type { Metadata } from "next";
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
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}

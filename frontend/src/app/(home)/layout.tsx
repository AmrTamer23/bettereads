"use client";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";

export default function Home({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Navbar />
        {children}
      </ThemeProvider>
    </>
  );
}

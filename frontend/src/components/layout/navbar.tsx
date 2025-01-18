"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [moodChecked, setMoodChecked] = useState<boolean>(true);

  console.log(theme);

  return (
    <header className="flex items-end justify-between pt-8 px-12">
      <Link href="/">
        <h1 className="~text-2xl/4xl text-primary dark:text-[#AF8F6F]">
          BetterReads
        </h1>
      </Link>
      <nav className="*:~text-lg/xl flex gap-2 items-end *:dark:text-[#AF8F6F]">
        <Button variant="link" asChild>
          <Link href="/search">Search </Link>
        </Button>
        {/* <Button variant="link" asChild>
          <Link href="/">My Books</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/">To Buy</Link>
        </Button> */}

        <div>
          <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
            <Switch
              id="switch-12"
              checked={moodChecked}
              onCheckedChange={(checked) => {
                setMoodChecked(checked);
                setTheme(checked ? "light" : "dark");
              }}
              className="peer absolute inset-0 h-[inherit] w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
            />
            <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
              <Moon size={16} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
              <Sun size={16} strokeWidth={2} aria-hidden="true" />
            </span>
          </div>
          <Label htmlFor="switch-12" className="sr-only">
            Labeled switch
          </Label>
        </div>
      </nav>
    </header>
  );
}

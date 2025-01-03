import Link from "next/link";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <header className="flex items-end justify-between pt-8 px-12">
      <h1 className="~text-2xl/4xl text-primary">BetterReads</h1>
      <nav className="*:~text-lg/xl flex gap-2 items-center">
        <Button variant="link" asChild>
          <Link href="/">Search</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/">My Books</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/">To Buy</Link>
        </Button>
      </nav>
    </header>
  );
}

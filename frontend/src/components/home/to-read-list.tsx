import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

const pageVariants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ToReadList({
  data,
}: {
  data: { title: string; coverURL: string; author: string; bookId: string }[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(data.length / 4));

  return (
    <main className="flex flex-col items-center justify-center min-h-[70dvh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1"
        >
          {data
            .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
            .map((book) => (
              <Link
                key={book.coverURL}
                href={`/book/${book.bookId}`}
                className="h-fit"
              >
                <Card className="flex flex-col items-center justify-center">
                  <CardHeader>
                    <CardTitle className="line-clamp-1 font-sans text-xl">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-1">
                      {book.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={book.coverURL}
                      alt={book.title}
                      className="!h-[26rem] object-cover rounded-xl border w-full"
                      width={500}
                      height={300}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 *:font-mono">
        <p className="grow text-sm text-muted-foreground" aria-live="polite">
          Page <span className="text-foreground">{currentPage}</span> of{" "}
          <span className="text-foreground">{totalPages}</span>
        </p>
        <Pagination className="w-auto">
          <PaginationContent className="gap-3">
            <PaginationItem>
              <Button
                variant="outline"
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-disabled={currentPage === 1 ? true : undefined}
                role={currentPage === 1 ? "link" : undefined}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-disabled={currentPage === totalPages ? true : undefined}
                role={currentPage === totalPages ? "link" : undefined}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}

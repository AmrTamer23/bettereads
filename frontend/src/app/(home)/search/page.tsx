"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SearchIcon } from "lucide-react";
import { searchBooks } from "@/lib/api/scraper/search-books";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { data: res, refetch } = useQuery({
    queryKey: ["searchBooks", query],
    queryFn: async () => await searchBooks({ query }),
    enabled: false,
  });

  const onSubmit = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  const addToList = (book: BooksScrapedResult, list: string) => {
    // TODO: Add book to list Logic
    toast({
      title: "Book added",
      description: `${book.title} has been added to your ${list} list.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <form
        className="flex gap-4 mb-8 w-full max-w-2xl mx-auto items-center"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 !text-lg py-6 font-sans"
        />
        <Button disabled={loading} className="text-lg py-6 h-10" size="lg">
          <SearchIcon className="mr-2 h-8 w-8" />
          Search
        </Button>
      </form>

      {res?.data?.result?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {res?.data.result.map((book) => (
            <BookCard
              key={book.id + "search"}
              book={book}
              addToList={addToList}
            />
          ))}
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center flex-1 h-full min-h-[50dvh]">
          <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
              <animate
                id="svgSpinnersBlocksShuffle20"
                fill="freeze"
                attributeName="x"
                begin="0;svgSpinnersBlocksShuffle27.end"
                dur="0.2s"
                values="1;13"
              />
              <animate
                id="svgSpinnersBlocksShuffle21"
                fill="freeze"
                attributeName="y"
                begin="svgSpinnersBlocksShuffle24.end"
                dur="0.2s"
                values="1;13"
              />
              <animate
                id="svgSpinnersBlocksShuffle22"
                fill="freeze"
                attributeName="x"
                begin="svgSpinnersBlocksShuffle25.end"
                dur="0.2s"
                values="13;1"
              />
              <animate
                id="svgSpinnersBlocksShuffle23"
                fill="freeze"
                attributeName="y"
                begin="svgSpinnersBlocksShuffle26.end"
                dur="0.2s"
                values="13;1"
              />
            </rect>
            <rect
              width="10"
              height="10"
              x="1"
              y="13"
              fill="currentColor"
              rx="1"
            >
              <animate
                id="svgSpinnersBlocksShuffle24"
                fill="freeze"
                attributeName="y"
                begin="svgSpinnersBlocksShuffle20.end"
                dur="0.2s"
                values="13;1"
              />
              <animate
                id="svgSpinnersBlocksShuffle25"
                fill="freeze"
                attributeName="x"
                begin="svgSpinnersBlocksShuffle21.end"
                dur="0.2s"
                values="1;13"
              />
              <animate
                id="svgSpinnersBlocksShuffle26"
                fill="freeze"
                attributeName="y"
                begin="svgSpinnersBlocksShuffle22.end"
                dur="0.2s"
                values="1;13"
              />
              <animate
                id="svgSpinnersBlocksShuffle27"
                fill="freeze"
                attributeName="x"
                begin="svgSpinnersBlocksShuffle23.end"
                dur="0.2s"
                values="13;1"
              />
            </rect>
          </svg>
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

const BookCard = ({
  book,
  addToList,
}: {
  book: BooksScrapedResult;
  addToList: (book: BooksScrapedResult, list: string) => void;
}) => {
  return (
    <Link
      key={book.id}
      href={`/book/${book.bookURL.split("/")[3].split("?")[0]}`}
    >
      <Card className="flex justify-between items-center">
        <CardHeader className="flex items-center gap-2 !flex-row">
          <img
            src={book.cover}
            alt={book.title}
            className="w-fit h-28 object-contain mb-4 rounded-md"
          />
          <div className="flex gap-2 flex-col">
            <CardTitle className="leading-normal">{book.title}</CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </div>
        </CardHeader>

        <CardFooter className="!p-0 !pr-4">
          <Select onValueChange={(value) => addToList(book, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Add to list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Buy">To Buy</SelectItem>
              <SelectItem value="Already Read">Already Read</SelectItem>
              <SelectItem value="To Read">To Read</SelectItem>
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>
    </Link>
  );
};

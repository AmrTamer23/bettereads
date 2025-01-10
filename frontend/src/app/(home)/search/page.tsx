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
    refetch();
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 mb-8 w-full max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 !text-lg"
        />
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="text-lg"
          size="lg"
        >
          {loading ? "Searching..." : <SearchIcon className="mr-2 h-8 w-8" />}
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {res?.data.result.map((book) => (
          <BookCard
            key={book.id + "search"}
            book={book}
            addToList={addToList}
          />
        ))}
      </div>
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

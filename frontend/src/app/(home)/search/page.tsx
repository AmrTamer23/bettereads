"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Search } from "lucide-react";
import { searchBooks } from "@/lib/api/scraper/search-books";
import { useQuery } from "@tanstack/react-query";

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
    // In a real app, this would update the user's lists in a database
    toast({
      title: "Book added",
      description: `${book.title} has been added to your ${list} list.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="~text-2xl/3xl  font-bold mb-8">Search Books</h1>
      <div className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Searching..." : <Search className="mr-2 h-4 w-4" />}
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {res?.data.result.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-32 object-contain mb-4"
              />
            </CardContent>
            <CardFooter>
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
        ))}
      </div>
    </div>
  );
}

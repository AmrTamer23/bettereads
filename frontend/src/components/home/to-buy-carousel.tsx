"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const books = [
  {
    id: 1,
    title: "The Paris Apartment",
    author: "Lucy Foley",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 3,
    title: "The Maid",
    author: "Nita Prose",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 4,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/placeholder.svg?height=200&width=150",
  },
];

export default function ToBuyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {books.map((book) => (
            <div key={book.id} className="flex-[0_0_100%] min-w-0">
              <Card>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover mb-4"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="flex justify-center mt-4">
        {books.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === selectedIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

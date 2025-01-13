"use client";
import { useState } from "react";
import { Sidebar } from "@/components/book/sidebar";
import { getBookDetails } from "@/lib/api/scraper/book";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default function ClientPage({
  params: { url },
}: {
  params: { url: string };
}) {
  const [isReadMore, setIsReadMore] = useState(false);

  const { data: bookData, isFetched } = useQuery({
    queryKey: ["bookDetails", url],
    queryFn: async () =>
      await getBookDetails({
        url,
      }).then((res) => res.data),
  });

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <main>
      {isFetched && (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 ">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="sm:w-1/3">
                    <Image
                      src={bookData!.cover}
                      alt={bookData!.title}
                      width={200}
                      height={300}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="sm:w-2/3">
                    <h2 className="text-3xl font-bold mb-2 leading-normal">
                      {bookData!.title}
                    </h2>
                    <p className="text-xl mb-2">
                      by{" "}
                      {bookData!.author
                        .map((author) => (
                          <a
                            key={author.id + "author"}
                            href={author.url}
                            className="dark:text-zinc-400 text-zinc-800 hover:underline"
                          >
                            {author.name}
                          </a>
                        ))
                        .reduce((prev, curr) => (
                          <>
                            {prev}, {curr}
                          </>
                        ))}
                      .
                    </p>
                    <p className="mb-2">
                      <a
                        href={bookData!.seriesURL}
                        className="text-blue-600 hover:underline"
                      >
                        {bookData!.series}
                      </a>
                    </p>
                    <div className="flex items-center">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(parseFloat(bookData!.rating))
                                ? "text-amber-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-primary-foreground font-mono text-xl">
                        {bookData!.rating} avg rating
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-50 font-sans">
                      {isReadMore
                        ? bookData!.desc
                        : `${bookData!.desc.substring(0, 200)}... `}
                      <button
                        onClick={toggleReadMore}
                        className="text-blue-600 hover:underline ml-1"
                      >
                        {isReadMore ? "Read Less" : "Read More"}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <Sidebar
                genres={bookData!.genres}
                bookEdition={bookData!.bookEdition}
                publishDate={bookData!.publishDate}
                totalPages={
                  bookData!.bookEdition
                    .split(",")[0]
                    .split(" ")[0] as unknown as number
                }
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

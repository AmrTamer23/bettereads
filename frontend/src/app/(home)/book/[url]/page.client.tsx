"use client";
import { Sidebar } from "@/components/book/side-bar";
import { getBookDetails } from "@/lib/api/scraper/book";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ClientPage({
  params: { url },
}: {
  params: { url: string };
}) {
  const { data: bookData, isFetched } = useQuery({
    queryKey: ["bookDetails", url],
    queryFn: async () =>
      await getBookDetails({
        url,
      }).then((res) => res.data),
  });

  return (
    <main>
      {isFetched && (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="lg:w-2/3 flex flex-col ">
                <div className="flex flex-col sm:flex-row gap-6 ">
                  <div className="sm:w-1/3  h-fit">
                    <Image
                      src={bookData!.cover}
                      alt={bookData!.title}
                      width={200}
                      height={300}
                      className="w-full h-auto rounded-lg shadow-lg border"
                    />
                  </div>
                  <div className="sm:w-2/3  h-[45dvh]">
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
                      <span className="ml-2 text-primary font-mono text-xl brightness-150">
                        {bookData!.rating} avg rating
                      </span>
                    </div>{" "}
                    <ScrollArea className="h-96 w-full rounded-md  p-4 ">
                      <p className="text-lg text-gray-700 dark:text-gray-50 font-sans">
                        {bookData!.desc}
                      </p>
                    </ScrollArea>
                  </div>
                </div>
                <div className=" w-full h-full bg-card p-6 rounded-lg shadow-md border"></div>
              </div>
              <Sidebar
                bookId={url}
                genres={bookData!.genres}
                bookEdition={bookData!.bookEdition}
                publishDate={bookData!.publishDate}
                totalPages={
                  bookData!.bookEdition
                    .split(",")[0]
                    .split(" ")[0] as unknown as number
                }
                bookData={{
                  title: bookData!.title,
                  coverURL: bookData!.cover,
                  author: bookData!.author
                    .map((author) => author.name)
                    .join(", "),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

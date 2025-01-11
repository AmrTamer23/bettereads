"use client";
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
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
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
                    <h2 className="text-3xl font-bold mb-2">
                      {bookData!.title}
                    </h2>
                    <p className="text-xl mb-2">
                      by{" "}
                      <a
                        href={bookData!.author[0].url}
                        className="text-blue-600 hover:underline"
                      >
                        {bookData!.author[0].name}
                      </a>
                    </p>
                    <p className="mb-2">
                      <a
                        href={bookData!.seriesURL}
                        className="text-blue-600 hover:underline"
                      >
                        {bookData!.series}
                      </a>
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(parseFloat(bookData!.rating))
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      {/* <span className="ml-2 text-sm text-gray-600 font-sans">
                        {bookData!.rating} · {bookData!.ratingCount} ratings ·{" "}
                        {bookData!.reviewsCount}
                      </span> */}
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-50">
                      {bookData!.desc}
                    </p>
                  </div>
                </div>
                {/* <Reviews reviews={bookData!.reviews.slice(0, 10)} /> */}
              </div>
              <Sidebar
                genres={bookData!.genres}
                bookEdition={bookData!.bookEdition}
                publishDate={bookData!.publishDate}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

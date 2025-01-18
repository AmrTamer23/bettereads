"use client";
import { BookMarked } from "lucide-react";

import { getLibrary } from "@/lib/api/tracker/get-library";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReadList from "@/components/home/read-list";

export default function Home() {
  const { data: libraryData, isFetched } = useQuery({
    queryKey: ["library"],
    queryFn: async () => await getLibrary().then((res) => res.data.data),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="READING">
        <TabsList className="relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
          <TabsTrigger
            value="TO_READ"
            className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none text-lg"
          >
            To Read
          </TabsTrigger>
          <TabsTrigger
            value="READING"
            className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none text-lg"
          >
            Reading
          </TabsTrigger>
          <TabsTrigger
            value="READ"
            className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none text-lg"
          >
            Read
          </TabsTrigger>
        </TabsList>
        <TabsContent value="TO_READ" className="mt-8">
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between ">
              <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
                <BookMarked className="mr-2" />
                To Read
              </h2>
              <span className="text-lg font-mono">
                {isFetched
                  ? `You have ${
                      libraryData!.filter((book) => book.status === "TO_READ")
                        .length
                    } books to read`
                  : "Loading..."}
              </span>
            </div>
            <ReadList
              data={
                isFetched
                  ? libraryData!
                      .filter((book) => book.status === "TO_READ")
                      .sort((a, b) => {
                        if (a.progress > b.progress) return -1;
                        if (a.progress < b.progress) return 1;
                        return 0;
                      })
                  : []
              }
            />
          </section>
        </TabsContent>
        <TabsContent value="READING" className="mt-8">
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between ">
              <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
                <BookMarked className="mr-2" />
                Read
              </h2>
              <span className="text-lg font-mono">
                {isFetched
                  ? `You are reading ${
                      libraryData!.filter((book) => book.status === "READING")
                        .length
                    } books`
                  : "Loading..."}
              </span>
            </div>
            <ReadList
              data={
                isFetched
                  ? libraryData!
                      .filter((book) => book.status === "READING")
                      .sort((a, b) => {
                        if (a.progress > b.progress) return -1;
                        if (a.progress < b.progress) return 1;
                        return 0;
                      })
                  : []
              }
            />
          </section>
        </TabsContent>
        <TabsContent value="READ" className="mt-8">
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between ">
              <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
                <BookMarked className="mr-2" />
                Read
              </h2>
              <span className="text-lg font-mono">
                {isFetched
                  ? `You have read ${
                      libraryData!.filter((book) => book.status === "READ")
                        .length
                    } books`
                  : "Loading..."}
              </span>
            </div>
            <ReadList
              data={
                isFetched
                  ? libraryData!.filter((book) => book.status === "READ")
                  : []
              }
            />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

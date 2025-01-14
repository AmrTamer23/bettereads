"use client";
import { BookOpen, BookMarked } from "lucide-react";
import CurrentlyReading from "@/components/home/currently-reading";
import ToReadList from "@/components/home/to-read-list";
import { getLibrary } from "@/lib/api/tracker/get-library";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
            Currently Reading
          </TabsTrigger>
          <TabsTrigger
            value="READ"
            className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none text-lg"
          >
            Read
          </TabsTrigger>
        </TabsList>
        <TabsContent value="TO_READ" className="mt-8">
          <section>
            <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
              <BookMarked className="mr-2" />
              To Read
            </h2>
            <ToReadList
              data={
                isFetched
                  ? libraryData!.filter((book) => book.status === "TO_READ")
                  : []
              }
            />
          </section>
        </TabsContent>
        <TabsContent value="READING" className="mt-8">
          <section>
            <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2" />
              Currently Reading
            </h2>
            <CurrentlyReading />
          </section>
        </TabsContent>
        <TabsContent value="READ">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 3
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

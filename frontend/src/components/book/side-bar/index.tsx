import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BookDetails } from "./book-details";
import { LibraryStatus } from "./library-status";
import { ProgressUpdate } from "./progress-update";

import { addToLibrary, updateProgress } from "@/lib/api/tracker/add-to-library";
import { getLibrary, LibraryData } from "@/lib/api/tracker/get-library";

interface SidebarProps {
  bookId: string;
  genres: string[];
  bookEdition: string;
  publishDate: string;
  totalPages: number;
  bookData: {
    title: string;
    author: string;
    coverURL: string;
  };
}

export const Sidebar: FC<SidebarProps> = ({
  bookId,
  genres,
  bookEdition,
  publishDate,
  totalPages,
  bookData,
}) => {
  const { data: libraryData } = useQuery({
    queryKey: ["library"],
    queryFn: async () => await getLibrary().then((res) => res.data.data),
  });

  const [inLibrary, setInLibrary] = useState<
    LibraryData["data"][0]["status"] | null
  >(null);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();

  const handleAddToLibrary = async (
    value: LibraryData["data"][0]["status"]
  ) => {
    setInLibrary(value);
    const data = await addToLibrary({
      bookId: bookId,
      status: value,
      numberOfPages: Number(totalPages),
      startDate: value === "READING" ? new Date().toISOString() : null,
      finishDate: null,
      author: bookData.author,
      coverURL: bookData.coverURL,
      progress: value === "READ" ? 100 : 0,
      title: bookData.title,
    });

    if (data.status === 201 || data.status === 200) {
      toast({
        title: "Book added to library",
        description:
          value === "READING"
            ? "You can now update your reading progress"
            : "Book added successfully",
      });
    }
  };

  const handleProgressUpdate = async () => {
    const newStatus = progress === 100 ? "READ" : "READING";
    const data = await updateProgress({
      bookId: bookId,
      status: newStatus,
      progress: progress,
    });

    if (data.status === 201 || data.status === 200) {
      toast({
        title:
          newStatus === "READ" ? "Book marked as read" : "Progress updated",
        description:
          newStatus === "READ"
            ? "You've finished reading this book"
            : "Your reading progress has been updated",
      });
    }
  };

  useEffect(() => {
    if (libraryData) {
      const book = libraryData.find((b) => b.bookId === bookId);
      if (book) {
        setInLibrary(book.status as LibraryData["data"][0]["status"]);
        setProgress(book.progress);
      }
    }
  }, [bookId, libraryData]);

  return (
    <div className="lg:w-1/3 flex flex-col gap-4">
      <BookDetails
        genres={genres}
        bookEdition={bookEdition}
        publishDate={publishDate}
      />
      <div className="bg-card p-6 rounded-lg shadow-md border">
        {inLibrary ? (
          <div className="flex flex-col gap-4">
            <LibraryStatus inLibrary={inLibrary} />
            {(inLibrary === "READ" || inLibrary === "READING") && (
              <ProgressUpdate
                inLibrary={inLibrary}
                progress={progress}
                totalPages={totalPages}
                libraryData={libraryData!}
                bookId={bookId}
                setProgress={setProgress}
                handleProgressUpdate={handleProgressUpdate}
              />
            )}

            <Button
              onClick={() => setInLibrary(null)}
              variant="outline"
              className="mt-2"
            >
              Remove from Library
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Add it to your library?
            </h3>
            <Select onValueChange={handleAddToLibrary}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add to list" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TO_BUY">To Buy</SelectItem>
                <SelectItem value="READING">Reading</SelectItem>
                <SelectItem value="READ">Read</SelectItem>
                <SelectItem value="TO_READ">Want to Read</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </div>
  );
};

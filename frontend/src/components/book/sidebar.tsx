import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import { BookOpen, Pencil, BookMarked, Star, Minus, Plus } from "lucide-react";
import clsx from "clsx";
import { addToLibrary, updateProgress } from "@/lib/api/tracker/add-to-library";
import { useQuery } from "@tanstack/react-query";
import { getLibrary } from "@/lib/api/tracker/get-library";
import { useToast } from "@/hooks/use-toast";
import {
  Button as AriaButton,
  Group,
  Input as AriaInput,
  NumberField,
} from "react-aria-components";

type LibraryState = "TO_BUY" | "TO_READ" | "READING" | "READ";

type Quote = {
  id: string;
  text: string;
  page: number;
};

type Note = {
  id: string;
  text: string;
  page: number;
};

export function Sidebar({
  bookId,
  genres,
  bookEdition,
  publishDate,
  totalPages,
  bookData,
}: {
  bookId: string;
  genres: string[];
  bookEdition: string;
  publishDate: string;
  totalPages: number;
  bookData: {
    title: string;
    coverURL: string;
    author: string;
  };
}) {
  const { data: libraryData } = useQuery({
    queryKey: ["library"],
    queryFn: async () => await getLibrary().then((res) => res.data.data),
  });

  const [inLibrary, setInLibrary] = useState<LibraryState | null>(null);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newQuote, setNewQuote] = useState({ text: "", page: 0 });
  const [newNote, setNewNote] = useState({ text: "", page: 0 });

  const { toast } = useToast();

  const handleAddToLibrary = async (value: LibraryState) => {
    setInLibrary(value);
    if (value === "READ") {
      const data = await addToLibrary({
        bookId: bookId,
        status: value,
        numberOfPages: Number(totalPages),
        startDate: null,
        finishDate: null,
        author: bookData.author,
        coverURL: bookData.coverURL,
        progress: 100,
        title: bookData.title,
      });
      console.log(data);
      if (data.status === 201 || data.status === 200) {
        console.log("Book added to library");
      }
    } else if (value === "READING") {
      const data = await addToLibrary({
        bookId: bookId,
        status: value,
        numberOfPages: Number(totalPages),
        startDate: new Date().toISOString(),
        finishDate: null,
        author: bookData.author,
        coverURL: bookData.coverURL,
        progress: 0,
        title: bookData.title,
      });
      if (data.status === 201 || data.status === 200) {
        toast({
          title: "Book added to library",
          description: "You can now update your reading progress",
        });
      }
    } else if (value === "TO_BUY") {
      const data = await addToLibrary({
        bookId: bookId,
        status: value,
        numberOfPages: Number(totalPages),
        startDate: null,
        finishDate: null,
        author: bookData.author,
        coverURL: bookData.coverURL,
        progress: 0,
        title: bookData.title,
      });

      if (data.status === 201 || data.status === 200) {
        console.log("Book added to library");
      }
    } else if (value === "TO_READ") {
      const data = await addToLibrary({
        bookId: bookId,
        status: value,
        numberOfPages: Number(totalPages),
        startDate: null,
        finishDate: null,
        author: bookData.author,
        coverURL: bookData.coverURL,
        progress: 0,
        title: bookData.title,
      });

      if (data.status === 201 || data.status === 200) {
        console.log("Book added to library");
      }
    }
  };

  const addQuote = () => {
    if (newQuote.text && newQuote.page > 0) {
      setQuotes([...quotes, { ...newQuote, id: Date.now().toString() }]);
      setNewQuote({ text: "", page: 0 });
    }
  };

  const addNote = () => {
    if (newNote.text && newNote.page > 0) {
      setNotes([...notes, { ...newNote, id: Date.now().toString() }]);
      setNewNote({ text: "", page: 0 });
    }
  };

  const submitReview = () => {
    console.log("Review submitted:", { review, rating });
    // Here you would typically send the review to your backend
  };

  const [progress, setProgress] = useState(0);

  const handleProgressUpdate = async () => {
    if (progress === 100) {
      const data = await updateProgress({
        bookId: bookId,
        status: "READ",
        progress: 100,
      });

      if (data.status === 201 || data.status === 200) {
        toast({
          title: "Book marked as read",
          description: "You've finished reading this book",
        });
      }
    } else {
      const data = await updateProgress({
        bookId: bookId,
        status: "READING",
        progress: progress,
      });

      if (data.status === 201 || data.status === 200) {
        toast({
          title: "Progress updated",
          description: "Your reading progress has been updated",
        });
      }
    }
  };

  useEffect(() => {
    if (libraryData) {
      setInLibrary(
        libraryData.filter((b) => b.bookId === bookId)[0]
          ?.status as LibraryState
      );

      setProgress(libraryData.filter((b) => b.bookId === bookId)[0]?.progress);
    }
  }, [bookId, libraryData]);

  return (
    <div className="lg:w-1/3 flex flex-col gap-4">
      <div className="bg-card p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-4">Book Details</h3>
        <div className="mb-4">
          <h4 className="font-semibold">Genres</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {genres
              .filter((it) => it !== "")
              .map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-card text-sm rounded-full text-foreground border"
                >
                  {genre}
                </span>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Edition</h4>
          <p className="text-sm text-muted-foreground font-mono">
            {bookEdition}
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Published</h4>
          <p className="text-sm text-muted-foreground font-mono">
            {publishDate}
          </p>
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg shadow-md border">
        {inLibrary ? (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-4">In Library</h3>
              <p className="text-base text-muted-foreground font-sans">
                You have this book in your library. You marked it as{" "}
                <span
                  className={clsx(
                    "font-bold",
                    inLibrary === "READ" && "text-primary brightness-150",
                    inLibrary === "READING" && "text-primary brightness-200",
                    inLibrary === "TO_BUY" && "text-emerald-600",
                    inLibrary === "TO_READ" && "text-amber-600"
                  )}
                >
                  {inLibrary}
                </span>
                .
              </p>
            </div>
            {(inLibrary === "READ" || inLibrary === "READING") && (
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <BookMarked className="mr-2 h-4 w-4" />
                      Update Progress
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="flex flex-col gap-2">
                      <DialogTitle>Update Reading Progress</DialogTitle>
                      <DialogDescription>
                        Update the number of pages you&apos;ve read.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 py-4 font-sans text-lg">
                      <label htmlFor="pages" className="font-semibold">
                        Pages read:
                      </label>
                      <NumberField
                        defaultValue={
                          libraryData?.find((b) => b.bookId === bookId)
                            ?.progress
                            ? (libraryData.find((b) => b.bookId === bookId)!
                                .progress /
                                100) *
                              totalPages
                            : 0
                        }
                        minValue={0}
                        maxValue={totalPages}
                        onChange={(e) => {
                          setProgress((e / totalPages) * 100);
                        }}
                        className="*:text-lg"
                      >
                        <Group className="relative inline-flex h-9 w-full max-w-40  items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                          <AriaButton
                            slot="decrement"
                            className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Minus
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </AriaButton>
                          <AriaInput className="w-full grow bg-background px-3 py-2 text-center tabular-nums text-foreground focus:outline-none" />
                          <Button
                            slot="increment"
                            className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Plus
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Button>
                        </Group>
                      </NumberField>
                      <span className="text-lg text-muted-foreground">
                        / {totalPages}
                      </span>
                    </div>
                    <Button onClick={handleProgressUpdate} type="submit">
                      Update
                    </Button>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-full" />
                  <span className="text-sm font-medium font-mono">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>
            )}
            {inLibrary === "READ" ||
              (inLibrary === "READING" && (
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild className="flex-1">
                      <Button variant="outline">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Quotes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Quotes</DialogTitle>
                        <DialogDescription>
                          View and add quotes from your book.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="max-h-48 overflow-y-auto">
                          {quotes.map((quote) => (
                            <div
                              key={quote.id}
                              className="mb-2 p-2 bg-secondary rounded"
                            >
                              <p>&quot;{quote.text}&quot;</p>
                              <p className="text-sm text-muted-foreground">
                                Page: {quote.page}
                              </p>
                            </div>
                          ))}
                        </div>
                        {inLibrary === "READING" && (
                          <>
                            <div className="grid gap-2">
                              <label htmlFor="quote">New Quote</label>
                              <Textarea
                                id="quote"
                                value={newQuote.text}
                                onChange={(e) =>
                                  setNewQuote({
                                    ...newQuote,
                                    text: e.target.value,
                                  })
                                }
                                placeholder="Enter your quote here..."
                              />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="quotePage">Quote Page</label>
                              <Input
                                id="quotePage"
                                type="number"
                                value={newQuote.page}
                                onChange={(e) =>
                                  setNewQuote({
                                    ...newQuote,
                                    page: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <Button onClick={addQuote}>Add Quote</Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild className="flex-1">
                      <Button variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Notes</DialogTitle>
                        <DialogDescription>
                          View and add notes for your book.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="max-h-48 overflow-y-auto">
                          {notes.map((note) => (
                            <div
                              key={note.id}
                              className="mb-2 p-2 bg-secondary rounded"
                            >
                              <p>{note.text}</p>
                              <p className="text-sm text-muted-foreground">
                                Page: {note.page}
                              </p>
                            </div>
                          ))}
                        </div>
                        {inLibrary === "READING" && (
                          <>
                            <div className="grid gap-2">
                              <label htmlFor="note">New Note</label>
                              <Textarea
                                id="note"
                                value={newNote.text}
                                onChange={(e) =>
                                  setNewNote({
                                    ...newNote,
                                    text: e.target.value,
                                  })
                                }
                                placeholder="Enter your note here..."
                              />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="notePage">Note Page</label>
                              <Input
                                id="notePage"
                                type="number"
                                value={newNote.page}
                                onChange={(e) =>
                                  setNewNote({
                                    ...newNote,
                                    page: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <Button onClick={addNote}>Add Note</Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            {inLibrary === "READ" && (
              <div>
                <h4 className="font-semibold mb-2">Your Review</h4>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full mb-2"
                />
                <Button onClick={submitReview}>Submit Review</Button>
              </div>
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
}

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
import { BookOpen, Pencil, BookMarked, Star } from "lucide-react";
import clsx from "clsx";
import { addToLibrary } from "@/lib/api/tracker/add-to-library";
import { useQuery } from "@tanstack/react-query";
import { getLibrary } from "@/lib/api/tracker/get-library";

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

  useEffect(() => {
    if (libraryData) {
      setInLibrary(
        libraryData.filter((b) => b.bookId === bookId)[0]
          ?.status as LibraryState
      );
    }
  }, [bookId, libraryData]);

  const [pages, setPages] = useState(0);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newQuote, setNewQuote] = useState({ text: "", page: 0 });
  const [newNote, setNewNote] = useState({ text: "", page: 0 });

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

  const progressPercentage =
    libraryData?.find((b) => b.bookId === bookId)?.progress ??
    Math.round((pages / totalPages) * 100);

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
                    <DialogHeader>
                      <DialogTitle>Update Reading Progress</DialogTitle>
                      <DialogDescription>
                        Update the number of pages you&apos;ve read.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 py-4">
                      <label htmlFor="pages" className="font-semibold">
                        Pages read:
                      </label>
                      <Input
                        id="pages"
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        / {totalPages}
                      </span>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center gap-2">
                  <Progress value={progressPercentage} className="w-full" />
                  <span className="text-sm font-medium font-mono">
                    {progressPercentage}%
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

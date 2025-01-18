import { useState } from "react";
import { ReviewSection } from "./side-bar/review-section";

import { Notebook, Quote } from "lucide-react";

export function MyBox() {
  // const [quotes, setQuotes] = useState<Quote[]>([]);
  // const [notes, setNotes] = useState<Note[]>([]);
  const [review, setReview] = useState<{
    text: string;
    rating: number;
  } | null>(null);

  // const addQuote = () => {
  //   if (newQuote.text && newQuote.page > 0) {
  //     setQuotes([...quotes, { ...newQuote, id: Date.now().toString() }]);
  //     setNewQuote({ text: "", page: 0 });
  //   }
  // };

  // const addNote = () => {
  //   if (newNote.text && newNote.page > 0) {
  //     setNotes([...notes, { ...newNote, id: Date.now().toString() }]);
  //     setNewNote({ text: "", page: 0 });
  //   }
  // };

  const submitReview = () => {
    if (review?.text && review.rating > 0) {
      setReview({
        text: review.text,
        rating: review.rating,
      });
    }
  };
  return (
    <div className=" w-full h-full bg-card p-6 rounded-lg shadow-md border flex items-center justify-center gap-6">
      {/* <h1 className="text-2xl font-serif">You Completed this book!</h1> */}
      <ReviewSection
        review={
          review
            ? {
                text: review.text,
                rating: review.rating,
              }
            : null
        }
        newReview={{
          text: "",
          rating: 0,
        }}
        setNewReview={setReview}
        submitReview={submitReview}
      />
      <div className="bg-zinc-600 h-full w-0.5" />
      <div className="*:flex *:flex-col *:items-center *:justify-center *:gap-2 *:p-6  flex items-center *:cursor-pointer justify-center *:border *:rounded-xl gap-8">
        <div className="hover:bg-primary transition-all duration-150 animate-out">
          <Quote className="h-8 w-8" />
          <span>Quotes</span>
        </div>
        <div className="hover:bg-primary transition-all duration-150 animate-out">
          <Notebook className="h-8 w-8" />
          <span>Notes</span>
        </div>
      </div>
    </div>
  );
}

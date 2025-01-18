import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import clsx from "clsx";

interface ReviewSectionProps {
  review: {
    text: string;
    rating: number;
  } | null;
  newReview: { text: string; rating: number };
  setNewReview: (review: { text: string; rating: number }) => void;
  submitReview: () => void;
}

export const ReviewSection: FC<ReviewSectionProps> = ({
  review,
  setNewReview,
  submitReview,
}) => {
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={clsx(
              "w-8 h-8",
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  const [stars, setStars] = useState(0);
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold mb-2  text-xl">Your Review</h4>
      {review ? (
        <div className="flex flex-col gap-2">
          <StarRating rating={review.rating} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-fit">
                View Full Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your Review</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <StarRating rating={review.rating} />
                <p className="mt-2">{review.text}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit font-sans">
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write Your Review</DialogTitle>
              <DialogDescription>
                Share your thoughts about this book.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="rating">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} onClick={() => setStars(star)}>
                      <Star
                        className={clsx(
                          "w-8 h-8",
                          star <= stars
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="review">Review</label>
                <Textarea
                  id="review"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="Enter your review here..."
                  className="h-48 resize-none !text-lg font-sans"
                />
              </div>
              <Button
                onClick={() => {
                  setNewReview({ text: content, rating: stars });

                  submitReview();
                }}
              >
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

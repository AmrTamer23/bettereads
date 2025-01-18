import { FC } from "react";
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
  review: Review | null;
  newReview: { text: string; rating: number };
  setNewReview: (review: { text: string; rating: number }) => void;
  submitReview: () => void;
}

export const ReviewSection: FC<ReviewSectionProps> = ({
  review,
  newReview,
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
              "w-5 h-5",
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h4 className="font-semibold mb-2">Your Review</h4>
      {review ? (
        <div className="flex flex-col gap-2">
          <StarRating rating={review.stars} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Full Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your Review</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <StarRating rating={review.stars} />
                <p className="mt-2">{review.text}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Write a Review</Button>
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
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                    >
                      <Star
                        className={clsx(
                          "w-5 h-5",
                          star <= newReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="review">Review</label>
                <Textarea
                  id="review"
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      text: e.target.value,
                    })
                  }
                  placeholder="Enter your review here..."
                />
              </div>
              <Button onClick={submitReview}>Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

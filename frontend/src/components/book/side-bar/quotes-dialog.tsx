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
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";

interface QuotesDialogProps {
  quotes: {
    id: string;
    text: string;
    page: number;
  }[];
  inLibrary: "READ" | "READING";
  newQuote: { text: string; page: number };
  setNewQuote: (quote: { text: string; page: number }) => void;
  addQuote: () => void;
}

export const QuotesDialog: FC<QuotesDialogProps> = ({
  quotes,
  inLibrary,
  newQuote,
  setNewQuote,
  addQuote,
}) => {
  return (
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
              <div key={quote.id} className="mb-2 p-2 bg-secondary rounded">
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
  );
};

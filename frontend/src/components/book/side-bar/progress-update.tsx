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
import { Progress } from "@/components/ui/progress";
import { BookMarked, Minus, Plus } from "lucide-react";
import {
  Group,
  Button as AriaButton,
  Input as AriaInput,
  NumberField,
} from "react-aria-components";
import { LibraryData } from "@/lib/api/tracker/get-library";

interface ProgressUpdateProps {
  inLibrary: "READ" | "READING";
  progress: number;
  totalPages: number;
  libraryData: LibraryData["data"];
  bookId: string;
  setProgress: (progress: number) => void;
  handleProgressUpdate: () => void;
}

export const ProgressUpdate: FC<ProgressUpdateProps> = ({
  inLibrary,
  progress,
  totalPages,
  libraryData,
  bookId,
  setProgress,
  handleProgressUpdate,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={inLibrary === "READ"}>
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
                libraryData?.find((b) => b.bookId === bookId)?.progress
                  ? (libraryData.find((b) => b.bookId === bookId)!.progress /
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
                  <Minus size={16} strokeWidth={2} aria-hidden="true" />
                </AriaButton>
                <AriaInput className="w-full grow bg-background px-3 py-2 text-center tabular-nums text-foreground focus:outline-none" />
                <Button
                  slot="increment"
                  className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus size={16} strokeWidth={2} aria-hidden="true" />
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
  );
};

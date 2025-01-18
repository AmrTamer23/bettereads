import { FC } from "react";
import clsx from "clsx";
import { LibraryData } from "@/lib/api/tracker/get-library";

interface LibraryStatusProps {
  inLibrary: LibraryData["data"][0]["status"];
}

export const LibraryStatus: FC<LibraryStatusProps> = ({ inLibrary }) => {
  return (
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
  );
};

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
import { Pencil } from "lucide-react";

interface NotesDialogProps {
  notes: {
    id: string;
    text: string;
    page: number;
  }[];
  inLibrary: "READ" | "READING";
  newNote: { text: string; page: number };
  setNewNote: (note: { text: string; page: number }) => void;
  addNote: () => void;
}

export const NotesDialog: FC<NotesDialogProps> = ({
  notes,
  inLibrary,
  newNote,
  setNewNote,
  addNote,
}) => {
  return (
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
              <div key={note.id} className="mb-2 p-2 bg-secondary rounded">
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
  );
};

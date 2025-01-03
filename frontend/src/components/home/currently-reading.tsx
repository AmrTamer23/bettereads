import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    progress: 65,
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    progress: 30,
    cover: "/placeholder.svg?height=200&width=150",
  },
];

export default function CurrentlyReading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {books.map((book) => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-48 object-cover mb-4"
            />
            <Progress value={book.progress} className="w-full" />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {book.progress}% complete
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

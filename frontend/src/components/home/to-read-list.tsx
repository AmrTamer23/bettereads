import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const books = [
  {
    id: 1,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 3,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/placeholder.svg?height=200&width=150",
  },
];

export default function ToReadList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              className="w-full h-48 object-cover"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

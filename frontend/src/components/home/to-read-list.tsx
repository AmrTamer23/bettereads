import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ToReadList({
  data,
}: {
  data: {
    title: string;
    coverURL: string;
    author: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((book) => (
        <Card key={book.coverURL}>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={book.coverURL}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

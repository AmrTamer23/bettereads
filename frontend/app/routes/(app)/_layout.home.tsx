import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Book, BookOpen, List, PlusCircle } from "lucide-react";

//@ts-ignore
export const Route = createFileRoute("/(app)/_layout/home")({
  component: () => <Home />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, User!
          </h1>
          <p className="text-slate-600">Here's your reading overview</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Currently Reading
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 books</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Books Read</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 books</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">To Read</CardTitle>
              <List className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 books</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reading Goal
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 / 50 books</div>
              <Progress value={56} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Currently Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <BookProgressCard
                  title="The Great Gatsby"
                  author="F. Scott Fitzgerald"
                  coverUrl="/placeholder.svg?height=120&width=80"
                  progress={65}
                />
                <BookProgressCard
                  title="To Kill a Mockingbird"
                  author="Harper Lee"
                  coverUrl="/placeholder.svg?height=120&width=80"
                  progress={23}
                />
                <BookProgressCard
                  title="1984"
                  author="George Orwell"
                  coverUrl="/placeholder.svg?height=120&width=80"
                  progress={42}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Book
                </Button>
                <Button variant="outline" className="w-full">
                  <List className="mr-2 h-4 w-4" />
                  View All Books
                </Button>
                <Button variant="outline" className="w-full">
                  <Book className="mr-2 h-4 w-4" />
                  Update Progress
                </Button>
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Bookshelves</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="to-read">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="to-read">To Read</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="to-buy">To Buy</TabsTrigger>
              </TabsList>
              <TabsContent value="to-read" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <BookCard
                    title="Pride and Prejudice"
                    author="Jane Austen"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="The Catcher in the Rye"
                    author="J.D. Salinger"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="The Hobbit"
                    author="J.R.R. Tolkien"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                </div>
              </TabsContent>
              <TabsContent value="reading" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <BookCard
                    title="The Great Gatsby"
                    author="F. Scott Fitzgerald"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="To Kill a Mockingbird"
                    author="Harper Lee"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="1984"
                    author="George Orwell"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                </div>
              </TabsContent>
              <TabsContent value="read" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <BookCard
                    title="The Da Vinci Code"
                    author="Dan Brown"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="Harry Potter and the Sorcerer's Stone"
                    author="J.K. Rowling"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="The Hunger Games"
                    author="Suzanne Collins"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                </div>
              </TabsContent>
              <TabsContent value="to-buy" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <BookCard
                    title="The Alchemist"
                    author="Paulo Coelho"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="The Girl with the Dragon Tattoo"
                    author="Stieg Larsson"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                  <BookCard
                    title="The Kite Runner"
                    author="Khaled Hosseini"
                    coverUrl="/placeholder.svg?height=200&width=150"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BookProgressCard({
  title,
  author,
  coverUrl,
  progress,
}: {
  title: string;
  author: string;
  coverUrl: string;
  progress: number;
}) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={coverUrl}
        alt={`Cover of ${title}`}
        width={60}
        height={90}
        className="object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-600">{author}</p>
        <Progress value={progress} className="mt-2" />
        <p className="text-sm text-slate-600 mt-1">{progress}% complete</p>
      </div>
    </div>
  );
}

function BookCard({
  title,
  author,
  coverUrl,
}: {
  title: string;
  author: string;
  coverUrl: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex">
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            width={100}
            height={150}
            className="object-cover rounded"
          />
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-slate-600">{author}</p>
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block"
            >
              View Details
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

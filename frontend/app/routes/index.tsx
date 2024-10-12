import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Book, BookOpen, List, Star, TrendingUp } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "~/stores/user";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

export default function LandingPage() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  if (user?.id) {
    navigate({
      to: "/home",
      replace: true,
    });
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            BookTracker
          </span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Login
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Sign Up
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Reading Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Discover, track, and manage your reading adventures with
                  BookTracker. Your personal library, right at your fingertips.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Sign Up
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Comprehensive Book Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  Add books to your collection with detailed information
                  including title, author, page count, and ISBN. Keep track of
                  your entire library effortlessly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <List className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Personalized Reading Status</CardTitle>
                </CardHeader>
                <CardContent>
                  Organize your books by reading status: To Buy, To Read,
                  Reading, or Read. Always know where you stand with each book
                  in your collection.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Track Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  Monitor your reading progress for each book. Set start and
                  finish dates, update your current page, and watch your reading
                  habits evolve over time.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your Personal Library, Managed
                </h2>
                <p className="text-gray-500 md:text-xl">
                  BookTracker gives you complete control over your reading life.
                  Manage your books, track your progress, and gain insights into
                  your reading habits.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-indigo-600" /> Rate and review
                    books you've read
                  </li>
                  <li className="flex items-center gap-2">
                    <List className="h-4 w-4 text-indigo-600" /> Categorize
                    books by reading status
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-indigo-600" /> Track
                    reading progress and completion dates
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="BookTracker App Screenshot"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your Reading Journey Today
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join BookTracker and take control of your reading life. Create
                  your account now and start managing your personal library.
                </p>
              </div>
              <div>
                <Button
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  size="lg"
                >
                  Sign Up for Free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 BookTracker. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

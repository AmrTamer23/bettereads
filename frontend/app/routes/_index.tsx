import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Book, Facebook } from "lucide-react";
import { Link } from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      {" "}
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <Book className="h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Welcome to BookLovers</h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="flex items-center justify-center">
            <Separator className="flex-grow" />
            <span className="px-2 text-muted-foreground text-sm">OR</span>
            <Separator className="flex-grow" />
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full">
              <Facebook className="mr-2 h-4 w-4" />
              Sign in with Facebook
            </Button>
          </div>

          <div className="text-center space-y-2">
            <Link
              to="/register"
              className="text-sm text-primary hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
            <div>
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

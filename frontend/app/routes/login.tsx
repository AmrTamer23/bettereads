import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => <Login/>,
});

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter } from "lucide-react";
import Link from "next/link";

 function Login() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Goodreads
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-[#382110] hover:text-[#58371F]"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#382110] hover:bg-[#58371F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#382110]"
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#F9F7F4] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Facebook className="h-5 w-5 text-[#3B5998] mr-2" />
              Facebook
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2] mr-2" />
              Twitter
            </Button>
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link
            href="#"
            className="font-medium text-[#382110] hover:text-[#58371F]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

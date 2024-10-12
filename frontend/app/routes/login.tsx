import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Facebook } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { login } from "~/lib/api/auth";
import { useToast } from "~/hooks/use-toast";
import { userAtom } from "~/stores/user";
import { useAtom } from "jotai";
export const Route = createFileRoute("/login")({
  component: () => <Login />,
  ssr: false,
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formSchema>;

function Login() {
  const { toast } = useToast();

  const [user, setUser] = useAtom(userAtom);

  if (user?.id) {
    window.location.href = "/home";
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await login(values.email, values.password);
      console.log(res);
      if ("user" in res) {
        setUser(res.user);
        window.location.href = "/home";
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  }
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center lg:text-4xl text-3xl font-extrabold text-gray-900">
            Sign in to ReadRadar
          </h1>
        </div>
        <Form {...form}>
          <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="rounded-md space-y-4">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Username</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-t-md"
                          placeholder="Email address"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Password</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-b-md"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 lg:text-base"
                >
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#382110] hover:text-[#58371F]  lg:text-base"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm lg:text-base font-medium text-white bg-[#382110] hover:bg-[#58371F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#382110]"
              >
                Sign in
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#F9F7F4] text-gray-500  lg:text-base">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm lg:text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Facebook className="h-5 w-5 text-[#3B5998] mr-2" />
              Facebook
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="size-5 mr-2"
                viewBox="0 0 256 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              Google
            </Button>
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600 lg:text-base">
          Not a member?{" "}
          <a
            href="#"
            className="font-medium text-[#382110] hover:text-[#58371F]"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

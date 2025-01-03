import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/lib/api/auth/register";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await register(
        payload as {
          username: string;
          email: string;
          password: string;
        }
      );
      if (res.status === 200) {
        toast({
          title: "Account created",
          description: "You can now login to your account",
        });
        router.push("/login");
      } else {
        throw new Error(res.data.message);
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while creating your account",
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to register for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="amrtamer23"
                  required
                  name="username"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    className="pe-9"
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
                    required
                    name="password"
                  />
                  <button
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Eye size={16} strokeWidth={2} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
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
import { mentorSignIn, studentSignIn } from "@/app/(auth)/authActions";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  student: boolean;
};

export default function LoginForm({ student }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    startTransition(async () => {
      setIsPending(true);
      if (student) {
        const res = await studentSignIn({ email, password });
        const student_id = res.sid;
        localStorage.setItem("student-id", student_id);
        if (res.error && res.error.length > 0) {
          setErrorText(res.error);
          setIsPending(false);
        } else {
          router.replace("/s/myprofile");
        }
      } else {
        const res = await mentorSignIn({ email, password });
        const mentor_id = res.mid;
        localStorage.setItem("mentor-id", mentor_id);
        setErrorText(res.error ? res.error : "");
        router.replace("/m/myprofile");
      }
      setIsPending(false);
    });
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-4xl flex justify-center"></CardTitle>
          <CardDescription className="flex flex-col items-center justify-center text-lg">
            Sign in to your account
            <span className="text-red-500">{errorText}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={student ? "m@bscse.uiu.ac.bd" : "mentor@any.com"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSignIn}
              disabled={isPending}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href={student ? "/sign-up" : "/sign-up"}
              className="underline underline-offset-4"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

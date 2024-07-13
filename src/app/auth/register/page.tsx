import Link from "next/link";

import { RegisterForm } from "@/app/auth/_components/register-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-primary-foreground p-4">
      <Link
        href="/"
        className="text-sm text-primary hover:text-primary/90 flex gap-3 items-center"
      >
        <ArrowLeft /> Back to Home
      </Link>
      <Card className="max-w-[450px] w-full bg-primary rounded-lg py-4 flex flex-col text-primary-foreground">
        <CardHeader className="py-0 pt-4">
          <CardTitle className="text-3xl font-bold">Welcome 👋</CardTitle>
          <CardDescription className="text-sm opacity-85">
            Please fill the following fields to create your account!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center py-0">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-blue-500 font-semibold underline"
            >
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

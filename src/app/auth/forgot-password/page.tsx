import Link from "next/link";
import { ForgotPasswordForm } from "@/app/auth/_components/forgot-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-primary-foreground p-4">
      <Link
        href="/"
        className="text-sm text-primary hover:text-primary/90 flex gap-3 items-center"
      >
        <ArrowLeft /> Back to Home
      </Link>
      <Card className="max-w-[450px] w-full max-h-[600px] bg-primary rounded-lg py-4 flex flex-col text-primary-foreground">
        <CardHeader className="py-0 pt-4">
          <CardTitle className="text-3xl font-bold">
            Forgot Your Password?
          </CardTitle>
          <CardDescription className="text-sm opacity-85">
            Enter your email address below and we&apos;ll send you instructions
            to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex justify-center py-0">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="text-blue-500 font-semibold underline"
            >
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

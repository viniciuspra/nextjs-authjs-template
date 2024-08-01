import Link from "next/link";

import { NewPasswordForm } from "@/app/auth/_components/new-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";

export default function NewPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-primary-foreground p-4">
      <Link
        href="/auth/login"
        className="text-sm text-primary hover:text-primary/90 flex gap-3 items-center"
      >
        <ArrowLeft /> Back to Sign In
      </Link>
      <Card className="max-w-[450px] w-full max-h-[600px] bg-primary rounded-lg py-4 flex flex-col text-primary-foreground">
        <CardHeader className="py-0 pt-4">
          <CardTitle className="text-3xl font-bold">
            Change Your Password
          </CardTitle>
          <CardDescription className="text-sm opacity-85">
            Enter your new password below to update your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <NewPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

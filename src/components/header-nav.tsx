"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavProps {
  mobile?: boolean;
}

export function HeaderNav({ mobile }: NavProps) {
  return (
    <nav
      className={`${
        !mobile ? "md:flex items-center hidden" : "flex flex-col"
      } w-full`}
    >
      <Link
        href="/auth/login"
        className="inline-flex h-8 px-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-primary underline-offset-4 hover:underline"
      >
        Login
      </Link>

      <Link
        href="/auth/register"
        className="inline-flex h-8 px-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-primary underline-offset-4 hover:underline"
      >
        Register
      </Link>
      <Link
        href="/auth/login"
        className="inline-flex h-8 px-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-primary underline-offset-4 hover:underline"
      >
        Two factor verification (2FA)
      </Link>
      <Link
        href="/auth/login"
        className="inline-flex h-8 px-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-primary underline-offset-4 hover:underline"
      >
        Forgot password
      </Link>
    </nav>
  );
}

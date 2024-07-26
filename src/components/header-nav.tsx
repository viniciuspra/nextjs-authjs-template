"use client";
import Link from "next/link";

interface NavProps {
  mobile?: boolean;
}

export function HeaderNav({ mobile }: NavProps) {
  const LinkStyle =
    "inline-flex h-8 px-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-primary underline-offset-4 hover:underline";
  return (
    <nav
      className={`${
        !mobile ? "lg:flex items-center hidden" : "flex flex-col"
      } w-full`}
    >
      <Link href="/auth/login" className={LinkStyle}>
        Login
      </Link>

      <Link href="/auth/register" className={LinkStyle}>
        Register
      </Link>
      <Link href="/auth/login" className={LinkStyle}>
        Two factor verification (2FA)
      </Link>
      <Link href="/auth/forgot-password" className={LinkStyle}>
        Forgot password
      </Link>
      <Link href="api/auth/providers" className={LinkStyle}>
        Providers
      </Link>
    </nav>
  );
}

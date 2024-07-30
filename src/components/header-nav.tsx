"use client";
import Link from "next/link";

interface NavProps {
  mobile?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeaderNav({ mobile, setOpen }: NavProps) {
  const LinkStyle =
    "inline-flex h-8 px-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-primary underline-offset-4 hover:underline";
  const closeSheet = () => {
    if (mobile) {
      setOpen(false);
    }
  };

  return (
    <nav
      className={`${
        !mobile ? "lg:flex items-center hidden" : "flex flex-col"
      } w-full`}
    >
      <Link href="/auth/login" className={LinkStyle} onClick={closeSheet}>
        Login
      </Link>

      <Link href="/auth/register" className={LinkStyle} onClick={closeSheet}>
        Register
      </Link>
      <Link href="/auth/login" className={LinkStyle} onClick={closeSheet}>
        Two factor verification (2FA)
      </Link>
      <Link
        href="/auth/forgot-password"
        className={LinkStyle}
        onClick={closeSheet}
      >
        Forgot password
      </Link>
      <Link
        href="api/auth/providers"
        className={LinkStyle}
        onClick={closeSheet}
      >
        Providers
      </Link>
    </nav>
  );
}

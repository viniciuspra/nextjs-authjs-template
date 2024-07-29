"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface NavProps {
  mobile?: boolean;
}

export function HeaderNav({ mobile }: NavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`${
        !mobile ? "lg:flex items-center hidden" : "flex flex-col"
      } w-full`}
    >
      <Button
        asChild
        variant={"link"}
        className={`${
          pathname === "/settings" ? "underline font-semibold" : ""
        } underline-offset-4`}
      >
        <Link href="/settings">Settings</Link>
      </Button>
      <Button
        asChild
        variant={"link"}
        className={`${
          pathname === "/client" ? "underline" : ""
        } underline-offset-4`}
      >
        <Link href="/client">Client</Link>
      </Button>
      <Button
        asChild
        variant={"link"}
        className={`${
          pathname === "/server" ? "underline" : ""
        } underline-offset-4`}
      >
        <Link href="/server">Server</Link>
      </Button>
      <Button
        asChild
        variant={"link"}
        className={`${
          pathname === "/admin" ? "underline" : ""
        } underline-offset-4`}
      >
        <Link href="/admin">Admin</Link>
      </Button>
    </nav>
  );
}

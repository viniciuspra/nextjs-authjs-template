"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface NavProps {
  mobile?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeaderNav({ mobile, setOpen }: NavProps) {
  const pathname = usePathname();

  const closeSheet = () => {
    if (mobile) {
      if (setOpen) {
        setOpen(false);
      }
    }
  };

  return (
    <nav
      className={`${
        !mobile ? "lg:flex items-center hidden" : "flex flex-col"
      } w-full`}
    >
      <Button
        asChild
        variant={"link"}
        onClick={closeSheet}
        className={`${
          pathname === "/settings" ? "underline font-semibold" : ""
        } underline-offset-4`}
      >
        <Link href="/settings">Settings</Link>
      </Button>
      <Button
        asChild
        variant={"link"}
        onClick={closeSheet}
        className={`${
          pathname === "/client" ? "underline font-semibold" : ""
        } underline-offset-4`}
      >
        <Link href="/client">Client</Link>
      </Button>
      <Button
        asChild
        variant={"link"}
        onClick={closeSheet}
        className={`${
          pathname === "/server" ? "underline font-semibold" : ""
        } underline-offset-4`}
      >
        <Link href="/server">Server</Link>
      </Button>
      <Button
        asChild
        variant={"link"}
        onClick={closeSheet}
        className={`${
          pathname === "/admin" ? "underline font-semibold" : ""
        } underline-offset-4`}
      >
        <Link href="/admin">Admin</Link>
      </Button>
    </nav>
  );
}

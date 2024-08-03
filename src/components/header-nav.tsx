"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButtons } from "./auth-butons";

interface NavProps {
  mobile?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

export function HeaderNav({ mobile, setOpen, open }: NavProps) {
  const pathname = usePathname();

  const LinkStyle =
    "inline-flex h-7 px-1 items-center justify-center whitespace-nowrap text-sm transition-colors";

  const closeSheet = () => {
    if (mobile) {
      if (setOpen) {
        setOpen(false);
      }
    }
  };

  return (
    <div className={`${open && "flex-col items-center"} flex gap-4`}>
      <nav
        className={`${
          !mobile
            ? "lg:flex items-center hidden justify-end w-full"
            : "flex flex-col mb-10 w-fit"
        } gap-3`}
      >
        <Link
          href="/"
          className={`${LinkStyle} ${
            pathname === "/"
              ? "font-bold border-b-2 border-secondary"
              : "font-medium underline-offset-4 hover:underline"
          }`}
          onClick={closeSheet}
        >
          Página Inicial
        </Link>

        <Link
          href="/produtos"
          className={`${LinkStyle} ${
            pathname === "/produtos"
              ? "font-bold border-b-2 border-secondary"
              : "font-medium underline-offset-4 hover:underline"
          }`}
          onClick={closeSheet}
        >
          Produtos
        </Link>
        <Link
          href="/sobre"
          className={`${LinkStyle} ${
            pathname === "/sobre"
              ? "font-bold border-b-2 border-secondary"
              : "font-medium underline-offset-4 hover:underline"
          }`}
          onClick={closeSheet}
        >
          Sobre
        </Link>
        <Link
          href="/contato"
          className={`${LinkStyle} ${
            pathname === "/contato"
              ? "font-bold border-b-2 border-secondary"
              : "font-medium underline-offset-4 hover:underline"
          }`}
          onClick={closeSheet}
        >
          Contato
        </Link>
      </nav>
      <AuthButtons />
    </div>
  );
}

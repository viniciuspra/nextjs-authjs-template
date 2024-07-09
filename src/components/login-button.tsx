"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  const redirect = () => router.push("/auth/login");

  if (mode === "modal") {
    // TODO: implement modal
  }

  return (
    <span onClick={redirect} className="cursor-pointer">
      {children}
    </span>
  );
}

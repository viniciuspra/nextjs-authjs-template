import { LoginCard } from "@/app/auth/_components/login-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça Login em PlanejaKids",
  description:
    "Entre na sua conta PlanejaKids para acessar recursos exclusivos.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-primary-foreground">
      <LoginCard />
    </div>
  );
}

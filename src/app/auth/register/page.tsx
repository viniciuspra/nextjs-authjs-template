import { RegisterCard } from "@/app/auth/_components/register-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sua Conta no PlanejaKids",
  description: "Cadastre-se no PlanejaKids para acessar recursos personalizados."
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-primary-foreground p-4">
      <RegisterCard />
    </div>
  );
}

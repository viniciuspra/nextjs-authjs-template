import { RegisterForm } from "@/app/auth/_components/register-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function RegisterCard() {
  return (
    <Card className="max-w-[450px] w-full bg-white rounded-lg py-4 flex flex-col text-primary-foreground">
      <CardHeader className="py-0 pt-4">
        <div className="grid place-items-center pb-3">
          <Link href={"/"}>
            <Image
              src="/Logo.svg"
              alt="PlanejaKids Logo"
              width={200}
              height={30}
            />
          </Link>
        </div>
        <CardTitle className="text-3xl font-bold">Crie sua Conta</CardTitle>
        <CardDescription className="text-sm opacity-85 text-foreground">
          Preencha os campos abaixo para criar sua conta!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex justify-center py-0">
        <p className="text-sm">
          Já possui uma conta?{" "}
          <a
            href="/auth/login"
            className="text-blue-500 font-semibold underline"
          >
            Entrar
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

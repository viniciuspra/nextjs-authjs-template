"use client";
import { useState } from "react";

import { LoginForm } from "@/app/auth/_components/login-form";
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

export function LoginCard() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  return (
    <Card className="max-w-[450px] w-full bg-white rounded-lg py-4 flex flex-col text-foreground">
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
        <CardTitle className="text-3xl font-bold">
          {showTwoFactor ? "Two-Factor Authentication" : "Acesse sua conta"}
        </CardTitle>
        <CardDescription className="text-sm opacity-85 text-foreground">
          {showTwoFactor
            ? "Please enter the verification code sent to your email."
            : "preencha os campos abaixo para entrar!"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <LoginForm
          showTwoFactor={showTwoFactor}
          setShowTwoFactor={setShowTwoFactor}
        />
      </CardContent>
      {!showTwoFactor && (
        <CardFooter className="flex justify-center py-0">
          <p className="text-sm">
            Não tem uma conta?{" "}
            <a
              href="/auth/register"
              className="text-blue-500 font-semibold underline"
            >
              Crie uma conta
            </a>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

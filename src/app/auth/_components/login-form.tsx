"use client";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { OtpStyledInput } from "@/app/auth/_components/otp-input";
import { FormSuccess } from "@/app/auth/_components/form-success";
import { FormError } from "@/app/auth/_components/form-error";
import { Social } from "@/app/auth/_components/social";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/loading-spinner";

import { login } from "@/actions/login";

interface LoginFormProps {
  setShowTwoFactor: Dispatch<SetStateAction<boolean>>;
  showTwoFactor: boolean;
}

export function LoginForm({ showTwoFactor, setShowTwoFactor }: LoginFormProps) {
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Already Linked to Another Account!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setMessage(undefined);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
          {data.code ? (
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          ) : (
            <code className="text-white">
              {JSON.stringify(
                { email: data.email, password: data.password },
                null,
                2
              )}
            </code>
          )}
        </pre>
      ),
    });

    startTransition(() => {
      login(data, callbackUrl)
        .then((response) => {
          if (response?.error) {
            form.reset();
            setMessage({ type: "error", text: response.error });
          }
          if (response?.success) {
            form.reset();
            setMessage({ type: "success", text: response.success });
          }
          if (response?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          setMessage({ type: "error", text: "Something went wrong!" });
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5 mt-4"
      >
        {showTwoFactor ? (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormControl>
                <>
                  <FormItem>
                    <OtpStyledInput
                      numInputs={6}
                      inputType="number"
                      {...field}
                    />
                  </FormItem>
                  <FormMessage />
                </>
              </FormControl>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@provider.com"
                      type="email"
                      disabled={isPending}
                      className="h-11 disabled:cursor-wait"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••"
                        type="password"
                        disabled={isPending}
                        className="h-11 disabled:cursor-wait"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <FormMessage className="w-full text-start" />
                      <Button
                        className="pt-0.5 text-blue-500 h-fit p-px font-semibold"
                        variant={"link"}
                      >
                        <Link
                          href="/auth/forgot-password"
                          className="w-full h-full"
                        >
                          Forgot Password?
                        </Link>
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormError
              message={
                message?.type === "error" ? message.text : urlError ?? ""
              }
            />
            <FormSuccess
              message={message?.type === "success" ? message.text : ""}
            />
          </>
        )}
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-full h-11 disabled:opacity-50 disabled:cursor-wait font-semibold"
          >
            {isPending ? (
              <LoadingSpinner />
            ) : showTwoFactor ? (
              "Verify Code"
            ) : (
              "Login"
            )}
          </Button>
          {!showTwoFactor && <Social />}
        </div>
      </form>
    </Form>
  );
}

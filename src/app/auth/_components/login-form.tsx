"use client";
import { useState, useTransition } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormError } from "@/app/auth/_components/form-error";
import { FormSuccess } from "@/app/auth/_components/form-success";
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

export function LoginForm() {
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Already Linked to Another Account!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setMessage(undefined);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    startTransition(() => {
      login(data).then((response) => {
        if (response?.error) {
          setMessage({ type: "error", text: response.error });
        }
        if (response?.success) {
          setMessage({ type: "success", text: response.success });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5 mt-4"
      >
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-end pt-0.5">
            <Link
              href="/auth/forgot-password"
              className="text-blue-500 font-semibold underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <FormError
          message={message?.type === "error" ? message.text : urlError ?? ""}
        />
        <FormSuccess
          message={message?.type === "success" ? message.text : ""}
        />
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-full h-11 disabled:opacity-50 disabled:cursor-wait font-semibold"
          >
            {isPending ? <LoadingSpinner /> : "Login"}
          </Button>
          <Social />
        </div>
      </form>
    </Form>
  );
}

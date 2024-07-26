"use client";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";

import { ForgotPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormError } from "@/app/auth/_components/form-error";
import { FormSuccess } from "@/app/auth/_components/form-success";

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

import { forgotPassword } from "@/actions/forgot-password";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
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
      forgotPassword(data).then((response) => {
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
        <FormError message={message?.type === "error" ? message.text : ""} />
        <FormSuccess
          message={message?.type === "success" ? message.text : ""}
        />
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-full h-11 disabled:opacity-50 disabled:cursor-wait font-semibold"
          >
            {isPending ? <LoadingSpinner /> : "Send reset email"}
          </Button>
     
      </form>
    </Form>
  );
}

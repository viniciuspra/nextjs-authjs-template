"use client";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";

import { NewPasswordSchema } from "@/schemas/auth";
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
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export function NewPasswordForm() {
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setMessage(undefined);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    startTransition(() => {
      newPassword(data, token).then((response) => {
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
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••"
                  type="password"
                  disabled={isPending}
                  className="h-11 disabled:cursor-wait"
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-full text-start" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••"
                  type="password"
                  disabled={isPending}
                  className="h-11 disabled:cursor-wait"
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-full text-start" />
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
          {isPending ? <LoadingSpinner /> : "Change password"}
        </Button>
      </form>
    </Form>
  );
}

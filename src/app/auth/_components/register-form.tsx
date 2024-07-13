"use client";
import { useState, useTransition } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
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

import { register } from "@/actions/register";

export function RegisterForm() {
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
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
      register(data).then((response) => {
        if (response.error) {
          setMessage({ type: "error", text: response.error });
        } else if (response.success) {
          setMessage({ type: "success", text: response.success });
        }
      });
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3">
        <div className="space-y-1 pb-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    disabled={isPending}
                    className="h-11 disabled:cursor-wait"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>

        <div className="space-y-3">
          <FormError message={message?.type === "error" ? message.text : ""} />
          <FormSuccess
            message={message?.type === "success" ? message.text : ""}
          />
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-full h-11 font-semibold"
          >
            {isPending ? <LoadingSpinner /> : "Register"}
          </Button>
          <Button
            disabled={isPending}
            className="w-full h-10 relative focus-visible:ring-black border flex gap-3 font-bold border-secondary/20 hover:border-secondary/30 hover:shadow transition duration-150"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              width={24}
              height={24}
              loading="lazy"
              alt="google logo"
            />
            Sign up with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}

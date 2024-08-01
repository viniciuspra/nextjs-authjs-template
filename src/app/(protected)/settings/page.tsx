"use client";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas/auth";

import { settings } from "@/actions/settings";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { FormError } from "@/app/auth/_components/form-error";
import { FormSuccess } from "@/app/auth/_components/form-success";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      confirmPassword: undefined,
      changeRole: user?.role || "USER",
      enableTwoFactor: user?.isTwoFactorEnabled || false,
    },
  });

  const onSumbit = (data: z.infer<typeof SettingsSchema>) => {
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
      settings(data)
        .then((response) => {
          if (response.error) {
            setMessage({
              type: "error",
              text: response.error,
            });
          }

          if (response.success) {
            update();
            setMessage({
              type: "success",
              text: response.success,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            type: "error",
            text: "An error occurred while updating your settings.",
          });
        });
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className={`${!user?.isOAuth ? "max-w-6xl" : "max-w-[550px]"}`}>
        <CardHeader>
          <CardTitle className="text-5xl font-black">Settings Page</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)}>
              <div
                className={`${
                  !user?.isOAuth ? "lg:flex lg:items-center lg:gap-6" : ""
                } mb-6 space-y-4`}
              >
                <div
                  className={`${
                    !user?.isOAuth ? "lg:w-[400px]" : ""
                  } space-y-4`}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            type="text"
                            disabled={isPending}
                            className="h-11 disabled:cursor-wait w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!user?.isOAuth && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                type="text"
                                disabled={isPending}
                                className="h-11 disabled:cursor-wait w-full"
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
                                className="h-11 disabled:cursor-wait w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="••••••"
                                type="password"
                                disabled={isPending}
                                className="h-11 disabled:cursor-wait w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
                <div
                  className={`${
                    !user?.isOAuth ? "lg:w-[400px]" : ""
                  } space-y-4`}
                >
                  <FormField
                    control={form.control}
                    name="enableTwoFactor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Two-Factor Authentication</FormLabel>
                          <FormDescription>
                            Protect your account with an extra verification
                            step.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={user?.isOAuth}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="changeRole"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>User Role</FormLabel>
                          <FormDescription className="pr-2">
                            Your current role is {user?.role}. Change it to{" "}
                            {user?.role === "ADMIN" ? "USER" : "ADMIN"} if
                            needed.
                          </FormDescription>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-fit">
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USER">USER</SelectItem>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <FormError
                  message={message?.type === "error" ? message.text : ""}
                />
                <FormSuccess
                  message={message?.type === "success" ? message.text : ""}
                />
                <Button disabled={isPending} className="w-full" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

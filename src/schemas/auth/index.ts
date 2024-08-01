import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

const NewPasswordSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "New password should be at least 6 characters long",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm new password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1, { message: "Name can't be empty" })),
    email: z.optional(
      z
        .string()
        .email({ message: "Email is not valid" })
        .min(1, { message: "Email can't be empty" })
    ),
    password: z.optional(
      z
        .string()
        .min(6, { message: "Password should be at least 6 characters long" })
    ),
    confirmPassword: z.optional(z.string()),
    enableTwoFactor: z.boolean().default(false).optional(),
    changeRole: z.enum(["ADMIN", "USER"]).default("USER").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });

export {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  NewPasswordSchema,
  SettingsSchema,
};

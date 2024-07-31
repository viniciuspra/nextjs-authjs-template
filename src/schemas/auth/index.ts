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
    message: "Confirm new password do not match",
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
    message: "Confirm password do not match",
    path: ["confirmPassword"],
  });

export { LoginSchema, RegisterSchema, ForgotPasswordSchema, NewPasswordSchema };

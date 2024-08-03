import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
  code: z.optional(z.string()),
});

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email é obrigatório" }),
});

const NewPasswordSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "A nova senha deve ter pelo menos 6 caracteres",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirmação da nova senha é obrigatória",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "Email é obrigatório" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string().min(1, {
      message: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(1, { message: "Nome não pode estar vazio" })
    ),
    email: z.optional(
      z
        .string()
        .email({ message: "Email inválido" })
        .min(1, { message: "Email não pode estar vazio" })
    ),
    password: z.optional(
      z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    ),
    confirmPassword: z.optional(z.string()),
    enableTwoFactor: z.boolean().default(false).optional(),
    changeRole: z.enum(["ADMIN", "USER"]).default("USER").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  NewPasswordSchema,
  SettingsSchema,
};

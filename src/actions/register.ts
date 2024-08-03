"use server";
import { RegisterSchema } from "@/schemas/auth";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/token";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

interface RegisterResponse {
  error?: string;
  success?: string;
}

export const register = async (
  data: z.infer<typeof RegisterSchema>
): Promise<RegisterResponse> => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email já está em uso" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    name
  );

  return {
    success:
      "Email de confirmação enviado! Por favor, verifique sua caixa de entrada.",
  };
};

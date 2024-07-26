"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import { NewPasswordSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing Token!" };

  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { newPassword } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid reset password token." };
  }

  const hasExpires = new Date(existingToken.expiresAt) < new Date();

  if (hasExpires) {
    return { error: "Reset password token has expired." };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Account not found or created using a different method.",
    };
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedNewPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Password updated!",
  };
};

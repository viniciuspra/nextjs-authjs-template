"use server";
import { z } from "zod";

import { ForgotPasswordSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendRestPassword } from "@/lib/mail";

export const forgotPassword = async (
  data: z.infer<typeof ForgotPasswordSchema>
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return {
      error: "Account not found or created using a different method.",
    };
  }

  if (!existingUser.emailVerified) {
    return {
      error: "Unable to process your request. Please verify your email first.",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendRestPassword(
    passwordResetToken.email,
    passwordResetToken.token,
    existingUser.name
  );

  return {
    success: "Reset email sent!",
  };
};

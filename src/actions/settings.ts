"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { SettingsSchema } from "@/schemas/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateTwoFactorToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (data: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { data: values } = validatedFields;

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.confirmPassword = undefined;
    values.enableTwoFactor = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateTwoFactorToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      dbUser.name,
    );

    return { success: "Confirmation email sent! Please check your inbox." };
  }

  if (values.password && values.confirmPassword) {
    const hashedPassword = await bcrypt.hash(values.password, 10);

    values.password = hashedPassword;
    values.confirmPassword = undefined;
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      name: values.name || user.name,
      email: values.email || user.email,
      password: values.password || dbUser.password,
      isTwoFactorEnabled: values.enableTwoFactor,
      role: values.changeRole,
    },
  });

  return { success: "Settings updated successfully" };
};

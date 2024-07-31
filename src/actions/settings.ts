"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { SettingsSchema } from "@/schemas/auth";
import { getUserById } from "@/data/user";
import { generateTwoFactorToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (data: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password, enableTwoFactor, changeRole } =
    validatedFields.data;

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (email !== dbUser.email) {
    const verificationToken = await generateTwoFactorToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      dbUser.name
    );

    return { success: "Confirmation email sent! Please check your inbox." };
  }

  let hashedPassword = "";

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  if (password?.length === 0) {
    hashedPassword = dbUser.password as string;
  }

  if (password && password.length > 0 && password.length < 6) {
    return { error: "Password must be at least 6 characters long" };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      name,
      password: hashedPassword,
      isTwoFactorEnabled: enableTwoFactor,
      role: changeRole,
    },
  });

  return { success: "Settings updated successfully" };
};

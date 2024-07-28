"use server";
import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";

import { prisma } from "@/lib/prisma";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Account not found or created using a different method.",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      existingUser.name
    );

    return {
      success:
        "Email not verified. A new confirmation email has been sent. Please check your inbox.",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code" };
      }

      if (twoFactorToken?.token !== code) {
        return { error: "Invalid code" };
      }

      const hasExpires = new Date(twoFactorToken.expiresAt) < new Date();

      if (hasExpires) {
        return { error: "Code expired!" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });
 
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "CallbackRouteError":
          return { error: "Invalid credentials" };
        case "AccessDenied":
          return { error: "Access Denied" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

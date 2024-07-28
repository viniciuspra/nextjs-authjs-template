import crypto from "node:crypto";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "@/lib/prisma";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return verificationToken;
};

const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return passwordResetToken;
};

const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 15 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return twoFactorToken;
};

export {
  generateVerificationToken,
  generatePasswordResetToken,
  generateTwoFactorToken,
};

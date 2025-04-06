import crypto from "node:crypto";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "@/lib/prisma";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

/**
 * Generate a verification token for email verification
 *
 * @param email - The email to generate the token for
 * @returns The generated verification token
 */
const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // Delete existing token if it exists
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create new verification token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return verificationToken;
};

/**
 * Generate a password reset token
 *
 * @param email - The email to generate the token for
 * @returns The generated password reset token
 */
const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // Delete existing token if it exists
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create new password reset token
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return passwordResetToken;
};

/**
 * Generate a two-factor authentication token
 *
 * @param email - The email to generate the token for
 * @returns The generated two-factor token (6-digit code)
 */
const generateTwoFactorToken = async (email: string) => {
  // Generate a 6-digit code
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes

  // Delete existing token if it exists
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create new two-factor token
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

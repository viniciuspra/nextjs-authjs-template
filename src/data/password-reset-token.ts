import { prisma } from "@/lib/prisma";

/**
 * Get a password reset token by email
 *
 * Used to check if a user already has a password reset token
 * before generating a new one.
 *
 * @param email - The email to look up
 * @returns The password reset token or null if not found
 */
const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

/**
 * Get a password reset token by token value
 *
 * Used to validate a password reset link clicked by a user.
 *
 * @param token - The token value to look up
 * @returns The password reset token or null if not found
 */
const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export { getPasswordResetTokenByEmail, getPasswordResetTokenByToken };

import { prisma } from "@/lib/prisma";

/**
 * Get a verification token by email
 *
 * Used to check if a user already has a verification token
 * before generating a new one.
 *
 * @param email - The email to look up
 * @returns The verification token or null if not found
 */
const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

/**
 * Get a verification token by token value
 *
 * Used to validate an email verification link clicked by a user.
 *
 * @param token - The token value to look up
 * @returns The verification token or null if not found
 */
const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export { getVerificationTokenByEmail, getVerificationTokenByToken };

import { prisma } from "@/lib/prisma";

/**
 * Get a two-factor token by email
 *
 * Used to check if a user already has a two-factor token
 * before generating a new one.
 *
 * @param email - The email to look up
 * @returns The two-factor token or null if not found
 */
const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

/**
 * Get a two-factor token by token value
 *
 * Used to validate a two-factor code entered by a user.
 *
 * @param token - The token value to look up
 * @returns The two-factor token or null if not found
 */
const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export { getTwoFactorTokenByEmail, getTwoFactorTokenByToken };

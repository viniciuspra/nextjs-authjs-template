import { prisma } from "@/lib/prisma";

/**
 * Get a two-factor confirmation by user ID
 *
 * Used during login to check if a user has already completed
 * the two-factor authentication step.
 *
 * @param userId - The user ID to look up
 * @returns The two-factor confirmation or null if not found
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      },
    );

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};

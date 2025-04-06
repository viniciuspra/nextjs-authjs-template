import { prisma } from "@/lib/prisma";

/**
 * Get a user's OAuth account by user ID
 *
 * Used to determine if a user has connected an OAuth provider
 * (like Google, Facebook, GitHub) to their account.
 *
 * @param userId - The user ID to look up
 * @returns The account or null if not found
 */
export const getUserAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    return null;
  }
};

import { prisma } from "@/lib/prisma";

/**
 * Get a user by email
 *
 * Used for authentication, password reset, and email verification.
 *
 * @param email - The email to look up
 * @returns The user or null if not found
 */
const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};

/**
 * Get a user by ID
 *
 * Used for fetching user data after authentication.
 *
 * @param id - The user ID to look up
 * @returns The user or null if not found
 */
const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export { getUserByEmail, getUserById };

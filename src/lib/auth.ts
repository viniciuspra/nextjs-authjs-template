import { auth } from "@/auth";

/**
 * Authentication utility functions
 *
 * These functions provide easy access to:
 * - The current authenticated user
 * - The current user's role
 */

/**
 * Get the currently authenticated user
 *
 * @returns The current user or undefined if not authenticated
 */
export const currentUser = async () => {
  const session = await auth();

  const user = session?.user;

  return user;
};

/**
 * Get the role of the currently authenticated user
 *
 * @returns The current user's role or undefined if not authenticated
 */
export const currentRole = async () => {
  const session = await auth();

  const role = session?.user.role;

  return role;
};

import { useSession } from "next-auth/react";

/**
 * React hook to get the current user from the session
 *
 * This hook provides easy access to the authenticated user's data
 * for personalization and user-specific features in client components.
 *
 * @returns The current user object or undefined if not authenticated
 */
export const useCurrentUser = () => {
  const session = useSession();

  const user = session.data?.user;

  if (!user) return;

  return user;
};

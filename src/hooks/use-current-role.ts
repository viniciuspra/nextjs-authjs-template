import { useSession } from "next-auth/react";

/**
 * React hook to get the current user's role from the session
 *
 * This hook provides easy access to the authenticated user's role
 * for role-based UI rendering and access control in client components.
 *
 * @returns The current user's role or undefined if not authenticated
 */
export const useCurrentRole = () => {
  const session = useSession();

  const role = session.data?.user.role;

  return role;
};

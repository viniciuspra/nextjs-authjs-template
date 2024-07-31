import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  const role = session.data?.user.role;

  return role;
};

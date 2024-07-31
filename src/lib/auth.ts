import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  const user = session?.user;

  return user;
};

export const currentRole = async () => {
  const session = await auth();

  const role = session?.user.role;

  return role;
};

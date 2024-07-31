"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { type: "success", message: "Allowed" };
  }

  return { type: "error", message: "forbidden" };
};

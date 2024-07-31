"use client";
import { UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";

import Unauthorized from "@/components/unauthorized";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole | undefined;
}

export function RoleGate({ allowedRole = "ADMIN", children }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole || allowedRole === undefined) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}

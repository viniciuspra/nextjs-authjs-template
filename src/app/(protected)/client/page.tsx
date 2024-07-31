"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ClientPage() {
  const user = useCurrentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <UserInfo
        label="Client Example"
        description="This information comes from the client side."
        user={user}
      />
    </div>
  );
}

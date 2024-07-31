import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

export default async function ServerPage() {
  const user = await currentUser();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <UserInfo
        label="Server Example"
        description="This information comes from the server side."
        user={user}
      />
    </div>
  );
}

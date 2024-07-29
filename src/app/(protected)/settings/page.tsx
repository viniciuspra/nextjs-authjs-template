"use client";

import { useSession } from "next-auth/react";

import { PacmanLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const { status } = useSession();
  const user = useCurrentUser();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <PacmanLoader color="#5d5d63" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-black">Settings Page</h1>
      <pre className="mt-2 rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}

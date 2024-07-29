import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import { Header } from "@/app/(protected)/_components/header";

import { Toaster } from "@/components/ui/toaster";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto">
          {children}
          <Toaster />
        </div>
      </div>
    </SessionProvider>
  );
}

import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import { Header } from "@/app/(protected)/_components/header";

import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/loading-spinner";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen mt-16 mb-3 lg:mt-0 lg:mb-0">
        <Header />
        <div className="container mx-auto">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          <Toaster />
        </div>
      </div>
    </SessionProvider>
  );
}

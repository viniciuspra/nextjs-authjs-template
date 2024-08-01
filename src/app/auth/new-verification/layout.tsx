import { Suspense } from "react";

import { Toaster } from "@/components/ui/toaster";

import { LoadingSpinner } from "@/components/loading-spinner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      <Toaster />
    </div>
  );
}

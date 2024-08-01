import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { LoadingSpinner } from "@/components/loading-spinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs 14 Authentication Template",
  description: "A authentication template created with Nextjs 14 and Authjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  );
}

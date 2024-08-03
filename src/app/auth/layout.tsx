import type { Metadata, ResolvingMetadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main className="container min-h-screen mx-auto max-w-screen-2xl">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

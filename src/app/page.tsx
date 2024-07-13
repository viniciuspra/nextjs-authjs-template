import Link from "next/link";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ChevronRight, Github } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center px-10">
        <Link
          href="https://github.com/viniciuspra/nextjs-authjs-template"
          target="_blank"
        >
          <Badge
            variant={"secondary"}
            className="flex items-center gap-3 py-1 rounded-full cursor-pointer border border-ring/20"
          >
            <Github size={16} />
            <span>Check out this project on GitHub.</span>
            <ChevronRight size={16} />
          </Badge>
        </Link>

        <h1 className="font-black text-4xl text-white">
          Authentication Template with Next.js
        </h1>
        <p className="text-lg text-white font-semibold">
          A ready-to-use authentication template built with Next.js and Auth.js.
        </p>
        <Button className="mt-2 bg-secondary text-primary hover:bg-secondary/90 p-0 shadow-shape">
          <Link href="/auth/login" className="w-full h-full px-4 py-2">
            Get Started
          </Link>
        </Button>
      </div>
    </main>
  );
}

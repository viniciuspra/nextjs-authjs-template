import Header from "@/components/header";
import LoginButton from "@/components/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <h1 className="font-black text-4xl text-white">
          Authentication Template with Next.js
        </h1>
        <p className="text-lg text-white font-semibold">
          A ready-to-use authentication template built with Next.js and Auth.js.
        </p>
        <LoginButton>
          <Button className="mt-2 bg-darkShade text-primary border border-mediumShade hover:bg-darkShade/90">
            Get Started
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}

import { HeaderSheet } from "@/components/header-sheet";
import { HeaderNav } from "@/components/header-nav";

export function Header() {
  return (
    <header className="z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center h-16 justify-between">
        <HeaderSheet />
        <HeaderNav />
      </div>
    </header>
  );
}

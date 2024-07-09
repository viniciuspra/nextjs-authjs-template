import { Eclipse } from "lucide-react";
import { Button } from "./ui/button";
import LoginButton from "./login-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Eclipse />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none mx-4">
            <div className="border border-input hover:bg-accent hover:text-accent-foreground relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
              <input
                type="text"
                className="w-full h-full absolute bg-transparent px-3 rounded-[0.5rem]"
                placeholder="Search..."
              />
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            <LoginButton>
              <Button>Sign In</Button>
            </LoginButton>
            {/* <ModeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}

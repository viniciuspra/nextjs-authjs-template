"use client";

import { HeaderSheet } from "@/app/(protected)/_components/header-sheet";
import { HeaderNav } from "@/app/(protected)/_components/header-nav";
import { UserButton } from "./user-button";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2">
          <HeaderSheet />
          <HeaderNav />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="pl-4 md:pl-0 flex flex-1 justify-end">
            <div className="border border-ring/10 hover:bg-accent hover:text-accent-foreground relative h-8 rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 lg:w-60 w-40">
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
            <UserButton/>
          </nav>
        </div>
      </div>
    </header>
  );
}

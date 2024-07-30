"use client"
import Link from "next/link";

import { HeaderNav } from "@/app/(protected)/_components/header-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/components/useIsMobile";

import { Eclipse, Menu } from "lucide-react";
import { useState } from "react";

export function HeaderSheet() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger disabled={!isMobile}>
        {isMobile ? (
          <Menu className="size-6" onClick={() => setOpen(true)} />
        ) : (
          <Link href="/">
            <Eclipse className="size-6" />
          </Link>
        )}
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0" setOpen={setOpen}>
        <SheetHeader>
          <SheetTitle className="sticky top-0 h-14 flex items-center mx-8">
            <Eclipse className="size-6" />
          </SheetTitle>
        </SheetHeader>
        <HeaderNav mobile setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}

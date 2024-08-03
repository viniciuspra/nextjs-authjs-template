"use client";
import { useState } from "react";
import Link from "next/link";

import { HeaderNav } from "@/components/header-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/components/useIsMobile";

import { Menu } from "lucide-react";
import Image from "next/image";

export function HeaderSheet() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger disabled={!isMobile}>
        {isMobile ? (
          <Menu className="size-6" />
        ) : (
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="PlanejaKids Logo"
              width={178}
              height={34}
            />
          </Link>
        )}
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0" setOpen={setOpen}>
        <SheetHeader>
          <SheetTitle className="sticky top-0 h-14 flex items-center justify-center mt-10">
            <Image
              src="/Logo.svg"
              alt="PlanejaKids Logo"
              width={200}
              height={34}
            />
          </SheetTitle>
        </SheetHeader>
        <div className="grid place-items-center py-4">
          <HeaderNav mobile setOpen={setOpen} open={open}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}

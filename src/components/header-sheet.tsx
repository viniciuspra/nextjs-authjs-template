import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeaderNav } from "@/components/header-nav";
import { useIsMobile } from "@/components/useIsMobile";

import { Eclipse, Menu } from "lucide-react";
export function HeaderSheet() {
  const isMobile = useIsMobile();

  return (
    <Sheet>
      <SheetTrigger disabled={!isMobile}>
        {isMobile ? (
          <Menu className="size-6" />
        ) : (
          <Eclipse className="size-6" />
        )}
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SheetHeader>
          <SheetTitle className="sticky top-0 h-14 flex items-center mx-8">
            <Eclipse className="size-6" />
          </SheetTitle>
        </SheetHeader>
        <HeaderNav mobile />
      </SheetContent>
    </Sheet>
  );
}

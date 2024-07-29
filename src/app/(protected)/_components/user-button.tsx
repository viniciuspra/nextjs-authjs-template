import { useCurrentUser } from "@/hooks/use-current-user";

import { LogoutButton } from "@/components/logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";

export function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <Avatar className="hover:brightness-75 transition">
          <AvatarImage src={user?.image || ""} alt="avatar" />
          <AvatarFallback className="border-2 ">
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
           <LogOut className="size-4 mr-2"/>
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { ExtendedUser } from "../../next-auth";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { User2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface UserInfoProps {
  label: string;
  description: string;
  user?: ExtendedUser;
}

export function UserInfo({ user, label, description }: UserInfoProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="rounded-lg shadow-md w-[500px]">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <div className="mr-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-zinc-900/60 hover:bg-zinc-900/50">
                <User2 />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <p className="text-zinc-300/80 font-medium">Name:</p>
              <h3 className="text-lg font-semibold tracking-wide">
                {user?.name}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-zinc-300/80 font-medium">Role:</p>
              <Badge
                variant={user?.role === "USER" ? "default" : "blue"}
                className="font-medium"
              >
                {user?.role}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-zinc-300/80 font-medium">ID:</p>
              <p className="font-medium">{user?.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-zinc-300/80 font-medium">Email:</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-zinc-300/80 font-medium">
                Two Factor Authentication:
              </p>
              <Badge
                className="font-medium"
                variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
              >
                {user?.isTwoFactorEnabled ? "true" : "false"}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full text-center text-zinc-300/80 mt-4">
          {description}
        </CardFooter>
      </Card>
    </div>
  );
}

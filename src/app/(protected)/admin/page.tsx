"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

import { RoleGate } from "@/components/role-gate";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

import { MoveHorizontal } from "lucide-react";
import { admin } from "@/actions/admin";

export default function AdminPage() {
  const role = useCurrentRole();

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast({
          title: response.statusText,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
              <code className="text-white">
                {JSON.stringify(
                  {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          ),
        });
      } else {
        toast({
          title: response.statusText,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
              <code className="text-white">
                {JSON.stringify(
                  {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          ),
        });
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((response) => {
      if (response.type === "success") {
        toast({
          title: response.message,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
              <code className="text-white">
                {JSON.stringify(response, null, 2)}
              </code>
            </pre>
          ),
        });
      } else {
        toast({
          title: response.message || "Forbidden",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
              <code className="text-white">
                {JSON.stringify(response, null, 2)}
              </code>
            </pre>
          ),
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader className="text-center border-b">
          <CardTitle className="text-4xl font-bold text-center">
            Admin Example
          </CardTitle>
          <div className="flex items-center justify-center gap-2">
            <CardDescription className="text-primary/80 font-semibold">
              Current Role:{" "}
            </CardDescription>
            <Badge variant={"blue"}>
              {role}
            </Badge>
          </div>
        </CardHeader>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <CardHeader>
            <CardTitle className="text-xl">User Accounts</CardTitle>
            <CardDescription>
              Manage all user accounts for your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem>Disable Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem>Disable Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem>Enable Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </RoleGate>

        <CardContent className="flex items-center justify-around border-t h-28 p-0">
          <h2>Admin-only</h2>
          <div className="flex items-center gap-10">
            <div>
              <h3 className="font-medium">API Routes</h3>
              <p className="text-muted-foreground text-xs">
                Test the admin-only API routes.
              </p>
            </div>
            <Button size="sm" onClick={onApiRouteClick}>
              Click to test
            </Button>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <h3 className="font-medium">Server Actions</h3>
              <p className="text-muted-foreground text-xs">
                Test the admin-only server actions.
              </p>
            </div>
            <Button size="sm" onClick={onServerActionClick}>
              Click to test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

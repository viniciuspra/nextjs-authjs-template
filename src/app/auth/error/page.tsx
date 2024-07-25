import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center p-4 justify-center bg-background/40">
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-4 p-8">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Something went wrong
            </h2>
            <p className="mt-2 text-muted-foreground">
              We&apos;re sorry, but an unexpected error has occurred. Please try
              again later or contact support if the issue persists.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-red-600/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              prefetch={false}
            >
              Go to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@raypx/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@raypx/ui/components/card";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  const router = useRouter();
  useEffect(() => {
    // Log error to error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb placeholder */}
      <div className="hidden h-5 sm:block" />

      {/* Error Card */}
      <div className="flex min-h-[400px] items-center justify-center sm:min-h-[500px]">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="pb-4 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-lg sm:text-xl">Something went wrong</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              We encountered an error while loading the dashboard. This might be a temporary issue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {process.env.NODE_ENV === "development" && (
              <div className="rounded-lg bg-muted p-3">
                <p className="break-all font-mono text-muted-foreground text-xs">{error.message}</p>
                {error.digest && (
                  <p className="mt-1 text-muted-foreground text-xs">Error ID: {error.digest}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="w-full sm:flex-1" onClick={reset} size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                className="w-full sm:flex-1"
                onClick={() => router.push("/dashboard")}
                size="sm"
                variant="outline"
              >
                Reload Dashboard
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-xs">
              If the problem persists, please contact support.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@raypx/ui/components/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Logo } from "@/components/layout/logo";

/**
 * 1. Note that error.tsx is loaded right after your app has initialized.
 * If your app is performance-sensitive and you want to avoid loading translation functionality
 * from next-intl as part of this bundle, you can export a lazy reference from your error file.
 * https://next-intl.dev/docs/environments/error-files#errorjs
 *
 * 2. Learned how to recover from a server component error in Next.js from @asidorenko_
 * https://x.com/asidorenko_/status/1841547623712407994
 */
export default function PageError({ reset }: { reset: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Logo className="size-12" />

      <div className="space-y-4 text-center">
        <h1 className="font-bold text-2xl">Something went wrong</h1>
        <p className="max-w-md text-muted-foreground">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          className="cursor-pointer"
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              router.refresh();
              reset();
            });
          }}
          type="submit"
          variant="default"
        >
          {isPending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
          Try Again
        </Button>

        <Button
          className="cursor-pointer"
          onClick={() => router.push("/")}
          type="submit"
          variant="outline"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

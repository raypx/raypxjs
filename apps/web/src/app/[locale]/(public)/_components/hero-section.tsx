"use client";

import { useAnalytics } from "@raypx/analytics";
import { useAuth } from "@raypx/auth/core";
import { Button } from "@raypx/ui/components/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Ripple } from "@/components/ui/ripple";

export function HeroSection() {
  const { track } = useAnalytics();
  const {
    viewPaths: pages,
    hooks: { useSession },
  } = useAuth();
  const { data: session } = useSession();

  const handleGetStartedClick = () => {
    track("hero_get_started_clicked", {
      section: "hero",
      user_authenticated: !!session?.session,
    });
  };

  const handleSignInClick = () => {
    track("hero_sign_in_clicked", {
      section: "hero",
    });
  };

  const handleConsoleClick = () => {
    track("hero_console_clicked", {
      section: "hero",
      user_id: session?.session?.userId,
    });
  };

  return (
    <main className="overflow-hidden" id="hero">
      {/* Background subtle gradients - MkSaaS style */}
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
      >
        <div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="-rotate-45 absolute top-0 left-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-60 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <section>
        <div className="relative pt-12">
          <div className="mx-auto max-w-7xl px-6">
            <Ripple />

            <div className="text-center sm:mx-auto lg:mt-0 lg:mr-auto">
              {/* Introduction badge */}
              <div className="animate-fade-in">
                <Link
                  className="group mx-auto flex w-fit items-center gap-2 rounded-full border p-1 pl-4 transition-colors hover:bg-accent"
                  href="https://x.com/raypxcom"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-foreground text-sm">🎉 Introducing Raypx AI Platform</span>

                  <div className="size-6 overflow-hidden rounded-full duration-500">
                    <div className="-translate-x-1/2 flex w-12 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Title */}
              <div className="mt-8 lg:mt-16">
                <h1 className="text-balance font-bold text-5xl xl:text-[5rem]">
                  Build AI-Powered Applications
                </h1>
              </div>

              {/* Description */}
              <div className="mx-auto mt-8 max-w-4xl">
                <p className="text-balance text-lg text-muted-foreground">
                  The complete platform for building, deploying, and scaling AI-powered applications
                  with enterprise-grade security and performance.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-12 flex flex-row items-center justify-center gap-4">
                {session?.session ? (
                  <div className="rounded-[calc(var(--radius-xl)+0.125rem)] border bg-foreground/10 p-0.5">
                    <Button asChild className="rounded-xl px-5 text-base" size="lg">
                      <Link href="/console" onClick={handleConsoleClick}>
                        <span className="text-nowrap">Go to Console</span>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-[calc(var(--radius-xl)+0.125rem)] border bg-foreground/10 p-0.5">
                      <Button asChild className="rounded-xl px-5 text-base" size="lg">
                        <Link href={pages.SIGN_UP} onClick={handleGetStartedClick}>
                          <span className="text-nowrap">Get Started Free</span>
                        </Link>
                      </Button>
                    </div>
                    <Button asChild className="h-10.5 rounded-xl px-5" size="lg" variant="outline">
                      <Link href={pages.SIGN_IN} onClick={handleSignInClick}>
                        <span className="text-nowrap">Live Demo</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product showcase */}
          <div className="-mr-56 relative mt-8 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20">
            <div
              aria-hidden
              className="absolute inset-0 z-10 bg-linear-to-b from-35% from-transparent to-muted/50"
            />
            <div className="relative inset-shadow-2xs mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-muted/50 p-4 shadow-lg shadow-zinc-950/15 ring-1 ring-muted/50 dark:inset-shadow-white/20">
              {/* Placeholder for product screenshot */}
              <div className="relative rounded-2xl bg-muted/50">
                <div className="flex aspect-video items-center justify-center rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="space-y-4 p-8 text-center">
                    <div className="font-bold text-4xl text-primary md:text-6xl">Raypx</div>
                    <div className="mx-auto max-w-md text-muted-foreground text-sm md:text-base">
                      AI-Powered Platform Dashboard
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                      <div className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:0.2s]" />
                      <div className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

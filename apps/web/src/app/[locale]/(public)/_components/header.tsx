"use client";

import { useAuth } from "@raypx/auth/core";
import { OrganizationSwitcher } from "@raypx/auth/organization";
import { Button } from "@raypx/ui/components/button";
import { ThemeSwitcher } from "@raypx/ui/components/theme-switcher";
import Image from "next/image";
import Link from "next/link";
import { LangSwitcher } from "@/components/lang-switcher";

export function Header() {
  const {
    viewPaths: pages,
    hooks: { useSession },
  } = useAuth();
  const { data: session } = useSession();

  return (
    <header className="w-full border-gray-200 border-b bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="font-semibold text-xl">
            <Image
              alt="Raypx"
              className="size-8 rounded-full"
              height={40}
              src="/images/logo.png"
              width={40}
            />
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LangSwitcher />
          {session?.session ? (
            <OrganizationSwitcher size="icon" />
          ) : (
            <div className="flex items-center gap-2">
              <Link href={pages.SIGN_IN}>
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href={pages.SIGN_UP}>
                <Button>Get started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

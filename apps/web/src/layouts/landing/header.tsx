"use client";

import { SignedIn, SignedOut, useAuth } from "@raypx/auth/core";
import { OrganizationSwitcher } from "@raypx/auth/organization";
import { Button } from "@raypx/ui/components/button";
import { ThemeSwitcher } from "@raypx/ui/components/theme-switcher";
import { cn } from "@raypx/ui/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { LangSwitcher } from "@/components/lang-switcher";
import { Logo } from "@/components/layout/logo";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Docs", href: "https://raypx.link/docs", external: true },
];

type HeaderProps = {
  scroll?: boolean;
};

export const Header = ({ scroll = true }: HeaderProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { viewPaths: pages } = useAuth();
  const t = useTranslations("common");

  React.useEffect(() => {
    if (!scroll) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  return (
    <section
      className={cn(
        "sticky inset-x-0 top-0 z-40 py-4 transition-all duration-300",
        scroll
          ? isScrolled
            ? "border-b bg-muted/50 backdrop-blur-md supports-backdrop-filter:bg-muted/50"
            : "bg-transparent"
          : "border-b bg-muted/50"
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Desktop navbar */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo and name */}
          <div className="flex items-center">
            <Link className="flex items-center space-x-2" href="/">
              <Logo />
              <span className="font-semibold text-xl">Raypx</span>
            </Link>
          </div>

          {/* Menu links */}
          <div className="flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                className="text-muted-foreground text-sm transition-colors hover:text-accent-foreground"
                href={item.href}
                key={index}
                rel={item.external ? "noopener noreferrer" : undefined}
                target={item.external ? "_blank" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Button asChild className="cursor-pointer" size="sm" variant="outline">
                <Link href={pages.SIGN_IN}>{t("login")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={pages.SIGN_UP}>{t("signUp")}</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <OrganizationSwitcher size="icon" />
            </SignedIn>
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </nav>

        {/* Mobile navbar */}
        <nav className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link className="flex items-center space-x-2" href="/">
              <Logo />
              <span className="font-semibold text-xl">Raypx</span>
            </Link>

            <button
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 p-2"
              onClick={() => setMenuState(!menuState)}
              type="button"
            >
              <Menu
                className={cn("size-6 transition-all", menuState && "rotate-180 scale-0 opacity-0")}
              />
              <X
                className={cn(
                  "absolute inset-0 m-auto size-6 transition-all",
                  !menuState && "-rotate-180 scale-0 opacity-0"
                )}
              />
            </button>
          </div>

          {/* Mobile menu */}
          {menuState && (
            <div className="mt-4 space-y-4 rounded-lg border bg-background p-4">
              {menuItems.map((item, index) => (
                <Link
                  className="block text-muted-foreground text-sm transition-colors hover:text-accent-foreground"
                  href={item.href}
                  key={index}
                  onClick={() => setMenuState(false)}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 border-t pt-4">
                <Button asChild className="w-full" size="sm" variant="outline">
                  <Link href={pages.SIGN_IN}>{t("login")}</Link>
                </Button>
                <Button asChild className="w-full" size="sm">
                  <Link href={pages.SIGN_UP}>{t("signUp")}</Link>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
};

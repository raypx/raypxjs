"use client";

import { useAuth } from "@raypx/auth/core";
import { Button } from "@raypx/ui/components/button";
import { ThemeSwitcher } from "@raypx/ui/components/theme-switcher";
import { cn } from "@raypx/ui/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LangSwitcher } from "@/components/lang-switcher";
import { Logo } from "@/components/layout/logo";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Docs", href: "https://docs.raypx.com", external: true },
];

interface HeaderProps {
  scroll?: boolean;
}

export const Header = ({ scroll = true }: HeaderProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { viewPaths: pages } = useAuth();

  React.useEffect(() => {
    if (!scroll) return;

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
            ? "bg-muted/50 backdrop-blur-md border-b supports-backdrop-filter:bg-muted/50"
            : "bg-transparent"
          : "border-b bg-muted/50",
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Desktop navbar */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo and name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-semibold">Raypx</span>
            </Link>
          </div>

          {/* Menu links */}
          <div className="flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm" className="cursor-pointer">
              <Link href={pages.SIGN_IN}>Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={pages.SIGN_UP}>Sign Up</Link>
            </Button>
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </nav>

        {/* Mobile navbar */}
        <nav className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-semibold">Raypx</span>
            </Link>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 p-2"
            >
              <Menu
                className={cn("size-6 transition-all", menuState && "rotate-180 scale-0 opacity-0")}
              />
              <X
                className={cn(
                  "absolute inset-0 m-auto size-6 transition-all",
                  !menuState && "-rotate-180 scale-0 opacity-0",
                )}
              />
            </button>
          </div>

          {/* Mobile menu */}
          {menuState && (
            <div className="mt-4 space-y-4 rounded-lg border bg-background p-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
                  onClick={() => setMenuState(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={pages.SIGN_IN}>Login</Link>
                </Button>
                <Button asChild size="sm" className="w-full">
                  <Link href={pages.SIGN_UP}>Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
};

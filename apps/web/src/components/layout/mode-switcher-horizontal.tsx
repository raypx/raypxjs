"use client";

import { Button } from "@raypx/ui/components/button";
import { cn } from "@raypx/ui/lib/utils";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Mode switcher component, used in the footer
 */
export function ModeSwitcherHorizontal() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common.mode");

  // Only show the UI after hydration to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 rounded-full border p-1">
        <div className="size-6 rounded-full px-0" />
        <div className="size-6 rounded-full px-0" />
        <div className="size-6 rounded-full px-0" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border p-1">
      <Button
        aria-label={t("light")}
        className={cn(
          "size-6 cursor-pointer rounded-full px-0",
          theme === "light" && "bg-muted text-foreground"
        )}
        onClick={() => setTheme("light")}
        size="icon"
        variant="ghost"
      >
        <SunIcon className="size-4" />
      </Button>

      <Button
        aria-label={t("dark")}
        className={cn(
          "size-6 cursor-pointer rounded-full px-0",
          theme === "dark" && "bg-muted text-foreground"
        )}
        onClick={() => setTheme("dark")}
        size="icon"
        variant="ghost"
      >
        <MoonIcon className="size-4" />
      </Button>

      <Button
        aria-label={t("system")}
        className={cn(
          "size-6 cursor-pointer rounded-full px-0",
          theme === "system" && "bg-muted text-foreground"
        )}
        onClick={() => setTheme("system")}
        size="icon"
        variant="ghost"
      >
        <LaptopIcon className="size-4" />
      </Button>
    </div>
  );
}

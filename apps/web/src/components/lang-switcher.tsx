"use client";

import { type Locale, useLocale, useTranslations } from "@raypx/i18n";
import { usePathname, useRouter } from "@raypx/i18n/navigation";
import { Button } from "@raypx/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@raypx/ui/components/dropdown-menu";
import { cn } from "@raypx/ui/lib/utils";
import { Check, Languages } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useLocaleStore } from "@/stores/locale-store";

const locales = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", nativeName: "中文" },
] as const;

export const LangSwitcher = () => {
  // Return null if there's only one locale available
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const { setCurrentLocale } = useLocaleStore();
  const [, startTransition] = useTransition();
  const t = useTranslations("common");

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale, setCurrentLocale]);

  const setLocale = (nextLocale: Locale) => {
    setCurrentLocale(nextLocale);

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-8 cursor-pointer rounded-full border border-border p-0.5"
          size="sm"
          variant="ghost"
        >
          <Languages className="size-3" />
          <span className="sr-only">{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownMenuItem
            className={cn(
              "flex cursor-pointer items-center justify-between",
              locale === loc.code && "bg-accent"
            )}
            key={loc.code}
            onClick={() => setLocale(loc.code)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{loc.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{loc.nativeName}</span>
                <span className="text-muted-foreground text-xs">{loc.name}</span>
              </div>
            </div>
            {locale === loc.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

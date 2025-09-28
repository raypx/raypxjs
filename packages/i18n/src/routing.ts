import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh"] as const;
export const defaultLocale = "en";

export type Locale = (typeof routing.locales)[number];

export const localeConfig: Record<Locale, { flag: string; name: Locale; nativeName: string }> = {
  en: {
    flag: "🇺🇸",
    name: "en",
    nativeName: "English",
  },
  zh: {
    flag: "🇨🇳",
    name: "zh",
    nativeName: "中文",
  },
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

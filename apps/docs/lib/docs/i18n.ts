import { defaultLocale, locales } from "@raypx/i18n/routing";
import type { I18nConfig } from "fumadocs-core/i18n";

/**
 * Internationalization configuration for FumaDocs
 *
 * https://fumadocs.dev/docs/ui/internationalization
 */
export const docsI18nConfig: I18nConfig = {
  defaultLanguage: defaultLocale,
  languages: locales as unknown as string[],
  hideLocale: "default-locale",
};

import { hasLocale } from "@raypx/i18n";
import { routing } from "@raypx/i18n/routing";
import { getRequestConfig } from "@raypx/i18n/server";

export default getRequestConfig(async function createRequestConfig({ requestLocale }) {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: {
      common: (await import(`../../locales/${locale}/common.json`)).default,
      dashboard: (await import(`../../locales/${locale}/dashboard.json`)).default,
      layout: (await import(`../../locales/${locale}/layout.json`)).default,
      navigation: (await import(`../../locales/${locale}/navigation.json`)).default,
      auth: (await import(`@auth/messages/${locale}.json`)).default,
    },
  };
});

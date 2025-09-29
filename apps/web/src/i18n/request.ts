import { hasLocale } from "@raypx/i18n";
import { routing } from "@raypx/i18n/routing";
import { getRequestConfig } from "@raypx/i18n/server";

// This implementation is generally acceptable for most Next.js/Node.js server environments, but there are some performance considerations:
// 1. Each request dynamically imports multiple JSON files (common, dashboard, layout, navigation, auth), which may cause disk I/O on every request if not cached, potentially impacting performance under high concurrency.
// 2. Node.js's require/import mechanism usually caches modules (including JSON files), but since the import path changes with locale, each locale will be cached separately.
// 3. If you have many locales, the first request for each locale will incur I/O overhead, but subsequent requests will use the cache, so the impact is limited.
// 4. If your JSON files are large or change frequently, consider a more efficient caching strategy (such as Redis or in-memory cache).

// Optimization suggestion:
// - If the number of locales and JSON files is limited, this approach is fine.
// - If you encounter performance bottlenecks, you can implement a simple in-memory cache or use a more advanced caching solution.

// Simple in-memory cache example (optional optimization)
// Note: This is only suitable for single-process deployments. For distributed systems, use a shared cache.

declare global {
  var __i18nCache: Record<string, any>;
}

let i18nCache: Record<string, any> = globalThis.__i18nCache;
if (!i18nCache) {
  i18nCache = {};
  globalThis.__i18nCache = i18nCache;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  if (!i18nCache[locale]) {
    i18nCache[locale] = {
      common: (await import(`../../locales/${locale}/common.json`)).default,
      dashboard: (await import(`../../locales/${locale}/dashboard.json`)).default,
      layout: (await import(`../../locales/${locale}/layout.json`)).default,
      navigation: (await import(`../../locales/${locale}/navigation.json`)).default,
      auth: (await import(`@auth/messages/${locale}.json`)).default,
    };
  }

  return {
    locale,
    messages: i18nCache[locale],
    timeZone: "UTC",
  };
});

import { routing } from "@raypx/i18n/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Navigation APIs
 *
 * https://next-intl.dev/docs/routing/navigation
 * https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/i18n/navigation.ts
 */
export const {
  Link: LocaleLink,
  getPathname: getLocalePathname,
  redirect: localeRedirect,
  usePathname: useLocalePathname,
  useRouter: useLocaleRouter,
} = createNavigation(routing);

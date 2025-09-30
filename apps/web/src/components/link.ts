import { routing } from "@raypx/i18n/routing";
import { createNavigation } from "next-intl/navigation";

export const { Link, usePathname, useRouter, getPathname } = createNavigation(routing);

export {
  Link as LocaleLink,
  getPathname as getLocalePathname,
  usePathname as useLocalePathname,
  useRouter as useLocaleRouter,
};

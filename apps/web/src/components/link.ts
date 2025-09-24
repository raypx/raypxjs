import { createNavigation } from "next-intl/navigation";
import { routing } from "@/config/i18n.config";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export {
  Link as LocaleLink,
  getPathname as getLocalePathname,
  usePathname as useLocalePathname,
  useRouter as useLocaleRouter,
};

import { routing } from "@raypx/i18n/routing";
import { createNavigation } from "next-intl/navigation";

export const { getPathname } = createNavigation(routing);

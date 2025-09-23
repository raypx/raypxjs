"use client";

import { useAuth } from "@raypx/auth/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@raypx/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@raypx/ui/components/sidebar";
import { toast } from "@raypx/ui/components/toast";
import { ChevronsUpDown, Languages, LaptopIcon, LogOut, MoonIcon, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { type Locale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import { useLocalePathname, useLocaleRouter } from "@/components/link";
import { localeConfig, locales } from "../../config/i18n.config";
import { UserAvatar } from "../layout/user-avatar";

interface SidebarUserProps {
  user: any;
  className?: string;
}

/**
 * User navigation for the dashboard sidebar
 */
export function SidebarUser({ user }: SidebarUserProps) {
  const { setTheme } = useTheme();
  const router = useLocaleRouter();
  const { isMobile } = useSidebar();
  const pathname = useLocalePathname();
  const params = useParams();
  const [, startTransition] = useTransition();
  const t = useTranslations();
  const { authClient } = useAuth();

  const setLocale = (nextLocale: Locale) => {
    // setCurrentLocale(nextLocale);

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("sign out success");
          // TanStack Query automatically handles cache invalidation on sign out
          router.replace("/");
        },
        onError: (error) => {
          console.error("sign out error:", error);
          toast.error(t("common.logoutFailed"));
        },
      },
    });
  };

  return (
    <SidebarMenu className="border-t pt-4">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent
              data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar name={user.name} image={user.image} className="size-8 border" />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar name={user.name} image={user.image} className="size-8 border" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <LaptopIcon className="mr-2 size-4" />
                  <span>{t("common.mode.label")}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                    <SunIcon className="mr-2 size-4" />
                    <span>{t("common.mode.light")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
                    <MoonIcon className="mr-2 size-4" />
                    <span>{t("common.mode.dark")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
                    <LaptopIcon className="mr-2 size-4" />
                    <span>{t("common.mode.system")}</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <Languages className="mr-2 size-4" />
                  <span>{t("common.language")}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {locales.map((localeOption) => (
                    <DropdownMenuItem
                      key={localeOption}
                      onClick={() => setLocale(localeOption)}
                      className="cursor-pointer"
                    >
                      {localeConfig[localeOption].flag && (
                        <span className="mr-2 text-md">{localeConfig[localeOption].flag}</span>
                      )}
                      <span className="text-sm">{localeConfig[localeOption].name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async (event) => {
                event.preventDefault();
                handleSignOut();
              }}
            >
              <LogOut className="mr-2 size-4" />
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

"use client";

import { useAuth } from "@raypx/auth/core";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@raypx/ui/components/sidebar";
import { useTranslations } from "next-intl";
import type * as React from "react";
import { useEffect, useState } from "react";
import { SidebarMain } from "@/components/dashboard/sidebar-main";
import { SidebarUser } from "@/components/dashboard/sidebar-user";
import { LocaleLink } from "@/components/link";
import { getSidebarLinks } from "@/config/sidebar.config";
import { Logo } from "../layout/logo";

/**
 * Dashboard sidebar
 */
export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const {
    hooks: { useSession },
  } = useAuth();
  const { data: session, isPending } = useSession();
  const [mounted, setMounted] = useState(false);
  const currentUser = session?.user;

  const sidebarLinks = getSidebarLinks();
  const filteredSidebarLinks = sidebarLinks.filter((link) => {
    if (link.authorizeOnly) {
      return link.authorizeOnly.includes((session?.user as any)?.role || "");
    }
    return true;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <LocaleLink href="/dashboard">
                <Logo className="size-5" />
                <span className="truncate font-semibold text-base">{t("Metadata.name")}</span>
              </LocaleLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {!isPending && mounted && <SidebarMain items={filteredSidebarLinks} />}
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-4">
        {/* Only show UI components when not in loading state */}
        {!isPending && mounted && (
          <>
            {/* show user profile if user is logged in */}
            {currentUser && <SidebarUser user={currentUser} />}
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

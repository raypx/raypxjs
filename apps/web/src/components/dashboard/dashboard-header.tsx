import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@raypx/ui/components/breadcrumb";
import { Separator } from "@raypx/ui/components/separator";
import { SidebarTrigger } from "@raypx/ui/components/sidebar";
import { ThemeSwitcher } from "@raypx/ui/components/theme-switcher";
import React, { type ReactNode } from "react";
import { LangSwitcher } from "../lang-switcher";

// import { CreditsBalanceButton } from '../layout/credits-balance-button';
// import LocaleSwitcher from '../layout/locale-switcher';
// import { ModeSwitcher } from '../layout/mode-switcher';
// import { ThemeSelector } from '../layout/theme-selector';

type DashboardBreadcrumbItem = {
  label: string;
  isCurrentPage?: boolean;
};

type DashboardHeaderProps = {
  breadcrumbs: DashboardBreadcrumbItem[];
  actions?: ReactNode;
};

/**
 * Dashboard header
 */
export function DashboardHeader({ breadcrumbs, actions }: DashboardHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator className="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />

        <Breadcrumb>
          <BreadcrumbList className="font-medium text-base">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={`breadcrumb-${index}`}>
                {index > 0 && (
                  <BreadcrumbSeparator className="hidden md:block" key={`sep-${index}`} />
                )}
                <BreadcrumbItem
                  className={index < breadcrumbs.length - 1 ? "hidden md:block" : ""}
                  key={`item-${index}`}
                >
                  {item.isCurrentPage ? <BreadcrumbPage>{item.label}</BreadcrumbPage> : item.label}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* dashboard header actions on the right side */}
        <div className="ml-auto flex items-center gap-3 pl-4">
          {actions}

          {/* <CreditsBalanceButton /> */}
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}

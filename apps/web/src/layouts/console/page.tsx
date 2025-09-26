"use client";

import { useSession } from "@raypx/auth/client";
import { Button } from "@raypx/ui/components/button";
import { Sheet, SheetContent } from "@raypx/ui/components/sheet";
import { cn } from "@raypx/ui/lib/utils";
import {
  BarChart3,
  Bell,
  Building2,
  FileText,
  Home,
  Key,
  Menu,
  Settings,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { SettingsModal } from "@/components/settings-modal";

export type ConsolePageProps = {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
  maxWidth?: "4xl" | "6xl" | "full";
};

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Knowledge", href: "/dashboard/knowledge", icon: FileText },
  { name: "Organizations", href: "/account/organizations", icon: Building2 },
  { name: "API Keys", href: "/account/api-keys", icon: Key },
  { name: "Security", href: "/account/security", icon: Shield },
  { name: "Settings", href: "/account/settings", icon: Settings },
];

export function ConsolePage({
  children,
  title,
  description,
  className = "",
  maxWidth = "full",
}: ConsolePageProps) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (!session?.user) {
    return null;
  }

  const maxWidthClass = {
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet onOpenChange={setSidebarOpen} open={sidebarOpen}>
        <SheetContent className="w-80 p-0" side="left">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b px-6">
              <h1 className="font-semibold text-xl">Raypx</h1>
              <Button onClick={() => setSidebarOpen(false)} size="icon" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 font-medium text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    href={item.href}
                    key={item.name}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="font-semibold text-xl">Raypx</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 font-medium text-sm leading-6 transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                          href={item.href}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            size="icon"
            variant="ghost"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Separator */}
          <div className="h-6 w-px bg-border lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1">
              <div className="flex items-center">
                <h1 className="font-semibold text-foreground text-lg">{title}</h1>
                {description && (
                  <span className="ml-2 text-muted-foreground text-sm">{description}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <Button className="relative" size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
                <span className="-top-1 -right-1 absolute h-3 w-3 rounded-full bg-red-500" />
              </Button>

              {/* User menu */}
              <div className="flex items-center gap-x-2">
                <SettingsModal
                  trigger={
                    <Button size="icon" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  }
                />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="hidden font-medium text-foreground text-sm lg:block">
                  {session.user.name || session.user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", maxWidthClass, className)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import { RedirectToSignIn } from "@raypx/auth/core";
import { SidebarInset, SidebarProvider } from "@raypx/ui/components/sidebar";
import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <RedirectToSignIn />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar variant="inset" />

        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}

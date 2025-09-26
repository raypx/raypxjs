import { Breadcrumb } from "@raypx/ui/components/breadcrumb";
import { Suspense } from "react";
import { DashboardLayout as DashboardLayoutLazy } from "@/components/dashboard-lazy";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardLayoutLazy description="Welcome to your console" title="Dashboard">
        <div className="space-y-4 sm:space-y-6">
          <Breadcrumb className="hidden sm:block" />
          {children}
        </div>
      </DashboardLayoutLazy>
    </Suspense>
  );
}

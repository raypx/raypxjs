"use client";

import { Badge } from "@raypx/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@raypx/ui/components/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type DashboardStatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: ReactNode;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
};

export function DashboardStatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  badge,
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{value}</div>
        {subtitle && <p className="text-muted-foreground text-xs">{subtitle}</p>}
        {badge && (
          <Badge className="mt-2" variant={badge.variant || "default"}>
            {badge.text}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

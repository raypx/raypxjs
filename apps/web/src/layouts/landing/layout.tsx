import type { ReactNode } from "react";

export type LandingLayoutProps = {
  children: ReactNode;
};

export function LandingLayout({ children }: LandingLayoutProps) {
  return <div className="bg-background">{children}</div>;
}

"use client";

import { useAuth } from "@raypx/auth/core";
import { Link } from "@raypx/ui/components/link";
import { useMemo } from "react";
import type { AuthViewPaths } from "../../core/lib/view-paths";

type AuthLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  pathName: keyof AuthViewPaths;
};

export function AuthLink({ pathName, ...props }: AuthLinkProps) {
  const { viewPaths } = useAuth();
  const path = useMemo(() => {
    const p = viewPaths[pathName];
    return p;
  }, [viewPaths, pathName]);

  return <Link {...props} href={path} />;
}

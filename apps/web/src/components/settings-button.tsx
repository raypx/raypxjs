"use client";

import { UserButton } from "@raypx/auth/account";
import { Button } from "@raypx/ui/components/button";
import { Settings } from "lucide-react";

type SettingsButtonProps = {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
  className?: string;
};

export function SettingsButton({
  variant = "ghost",
  size = "icon",
  children,
  className,
}: SettingsButtonProps) {
  return (
    <UserButton
      className={className}
      size={size}
      trigger={
        <Button className={className} size={size} variant={variant}>
          {children || <Settings className="h-4 w-4" />}
        </Button>
      }
    />
  );
}

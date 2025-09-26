"use client";

import type { SettingsCardProps } from "@raypx/ui/components/settings";
import { useAuth } from "../../core/hooks/use-auth";
import { UpdateFieldCard } from "./update-field-card";

export function UpdateNameCard({ className, classNames, ...props }: SettingsCardProps) {
  const {
    hooks: { useSession },
    t,
    nameRequired,
  } = useAuth();

  const { data: sessionData } = useSession();

  return (
    <UpdateFieldCard
      className={className}
      classNames={classNames}
      description={t("NAME_DESCRIPTION")}
      instructions={t("NAME_INSTRUCTIONS", { maxLength: 32 })}
      label={t("NAME")}
      name="name"
      placeholder={t("NAME_PLACEHOLDER")}
      required={nameRequired}
      value={sessionData?.user.name}
      {...props}
    />
  );
}

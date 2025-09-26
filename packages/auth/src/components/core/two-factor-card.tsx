"use client";

import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { SettingsCard } from "@raypx/ui/components/settings";
import { useState } from "react";
import { useAuth } from "../../core/hooks/use-auth";
import type { User } from "../../types";
import { TwoFactorPasswordDialog } from "./two-factor-password-dialog";

export type TwoFactorCardProps = {
  className?: string;
  classNames?: SettingsCardClassNames;
};

export function TwoFactorCard({ className, classNames }: TwoFactorCardProps) {
  const {
    t,
    hooks: { useSession },
  } = useAuth();

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const { data: sessionData, isPending } = useSession();
  const isTwoFactorEnabled = (sessionData?.user as User)?.twoFactorEnabled;

  return (
    <div>
      <SettingsCard
        action={() => setShowPasswordDialog(true)}
        actionLabel={isTwoFactorEnabled ? t("DISABLE_TWO_FACTOR") : t("ENABLE_TWO_FACTOR")}
        className={className}
        classNames={classNames}
        description={t("TWO_FACTOR_CARD_DESCRIPTION")}
        instructions={
          isTwoFactorEnabled
            ? t("TWO_FACTOR_DISABLE_INSTRUCTIONS")
            : t("TWO_FACTOR_ENABLE_INSTRUCTIONS")
        }
        isPending={isPending}
        title={t("TWO_FACTOR")}
      />

      <TwoFactorPasswordDialog
        classNames={classNames}
        isTwoFactorEnabled={!!isTwoFactorEnabled}
        onOpenChange={setShowPasswordDialog}
        open={showPasswordDialog}
      />
    </div>
  );
}

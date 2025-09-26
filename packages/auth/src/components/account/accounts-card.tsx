"use client";

import { CardContent } from "@raypx/ui/components/card";
import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { SettingsCard } from "@raypx/ui/components/settings";
import { cn } from "@raypx/ui/lib/utils";
import { useAuth } from "../../core/hooks/use-auth";
import { AccountCell } from "./account-cell";

export type AccountsCardProps = {
  className?: string;
  classNames?: SettingsCardClassNames;
};

export function AccountsCard({ className, classNames }: AccountsCardProps) {
  const {
    basePath,
    hooks: { useListDeviceSessions, useSession },
    t,
    viewPaths,
    navigate,
  } = useAuth();

  const { data: deviceSessions, isPending, refetch } = useListDeviceSessions();
  const { data: sessionData } = useSession();

  const otherDeviceSessions = (deviceSessions || []).filter(
    (ds) => ds.session.id !== sessionData?.session.id
  );

  return (
    <SettingsCard
      action={() => navigate(`${basePath}/${viewPaths.SIGN_IN}`)}
      actionLabel={t("ADD_ACCOUNT")}
      className={className}
      classNames={classNames}
      description={t("ACCOUNTS_DESCRIPTION")}
      instructions={t("ACCOUNTS_INSTRUCTIONS")}
      isPending={isPending}
      title={t("ACCOUNTS")}
    >
      {deviceSessions?.length && (
        <CardContent className={cn("grid gap-4", classNames?.content)}>
          {sessionData && (
            <AccountCell classNames={classNames} deviceSession={sessionData} refetch={refetch} />
          )}

          {otherDeviceSessions.map((deviceSession) => (
            <AccountCell
              classNames={classNames}
              deviceSession={deviceSession}
              key={deviceSession.session.id}
              refetch={refetch}
            />
          ))}
        </CardContent>
      )}
    </SettingsCard>
  );
}

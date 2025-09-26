"use client";

import { CardContent } from "@raypx/ui/components/card";
import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { SettingsCard } from "@raypx/ui/components/settings";
import { cn } from "@raypx/ui/lib/utils";
import { useAuth } from "../../core/hooks/use-auth";
import { socialProviders } from "../../core/lib/providers/social-providers";
import type { Refetch } from "../../types";
import { ProviderCell } from "./provider-cell";
import { SettingsCellSkeleton } from "./settings-cell-skeleton";

export type ProvidersCardProps = {
  className?: string;
  classNames?: SettingsCardClassNames;
  accounts?: { accountId: string; provider: string }[] | null;
  isPending?: boolean;
  skipHook?: boolean;
  refetch?: Refetch;
};

export function ProvidersCard({
  className,
  classNames,
  accounts,
  isPending,
  skipHook,
  refetch,
}: ProvidersCardProps) {
  const {
    hooks: { useListAccounts },
    t,
    social,
    genericOAuth,
  } = useAuth();

  if (!skipHook) {
    const result = useListAccounts();
    accounts = result.data;
    isPending = result.isPending;
    refetch = result.refetch;
  }

  return (
    <SettingsCard
      className={className}
      classNames={classNames}
      description={t("PROVIDERS_DESCRIPTION")}
      isPending={isPending}
      title={t("PROVIDERS")}
    >
      <CardContent className={cn("grid gap-4", classNames?.content)}>
        {isPending ? (
          social?.providers?.map((provider) => (
            <SettingsCellSkeleton classNames={classNames} key={provider} />
          ))
        ) : (
          <>
            {social?.providers?.map((provider) => {
              const socialProvider = socialProviders.find(
                (socialProvider) => socialProvider.provider === provider
              );

              if (!socialProvider) {
                return null;
              }

              return (
                <ProviderCell
                  account={accounts?.find((acc) => acc.provider === provider)}
                  classNames={classNames}
                  key={provider}
                  provider={socialProvider}
                  refetch={refetch}
                />
              );
            })}

            {genericOAuth?.providers?.map((provider) => (
              <ProviderCell
                account={accounts?.find((acc) => acc.provider === provider.provider)}
                classNames={classNames}
                key={provider.provider}
                other
                provider={provider}
                refetch={refetch}
              />
            ))}
          </>
        )}
      </CardContent>
    </SettingsCard>
  );
}

"use client";

import { Button } from "@raypx/ui/components/button";
import { Card } from "@raypx/ui/components/card";
import { Loader2 } from "@raypx/ui/components/icons";
import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { Skeleton } from "@raypx/ui/components/skeleton";
import { cn } from "@raypx/ui/lib/utils";
import type { SocialProvider } from "better-auth/social-providers";
import { useState } from "react";
import { useAuth } from "../../core/hooks/use-auth";
import type { Provider } from "../../core/lib/providers/social-providers";
import { getLocalizedError } from "../../core/lib/utils";
import type { Refetch } from "../../types";

export interface ProviderCellProps {
  className?: string;
  classNames?: SettingsCardClassNames;
  account?: {
    accountId: string;
    provider: string;
  } | null;
  isPending?: boolean;
  other?: boolean;
  provider: Provider;
  refetch?: Refetch;
}

export function ProviderCell({
  className,
  classNames,
  account,
  other,
  provider,
  refetch,
}: ProviderCellProps) {
  const {
    authClient,
    basePath,
    baseURL,
    t,
    mutators: { unlinkAccount },
    viewPaths,
    toast,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleLink = async () => {
    setIsLoading(true);
    const callbackURL = `${baseURL}${basePath}/${viewPaths.CALLBACK}?redirectTo=${window.location.pathname}`;

    try {
      if (other) {
        await authClient.oauth2.link({
          providerId: provider.provider as SocialProvider,
          callbackURL,
          fetchOptions: { throw: true },
        });
      } else {
        await authClient.linkSocial({
          provider: provider.provider as SocialProvider,
          callbackURL,
          fetchOptions: { throw: true },
        });
      }
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });

      setIsLoading(false);
    }
  };

  const handleUnlink = async () => {
    setIsLoading(true);

    try {
      await unlinkAccount({
        accountId: account?.accountId,
        providerId: provider.provider,
      });

      await refetch?.();
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className={cn("flex-row items-center gap-3 px-4 py-3", className, classNames?.cell)}>
      {provider.icon && <provider.icon className={cn("size-4", classNames?.icon)} />}

      <div className="flex-col">
        <div className="text-sm">{provider.name}</div>

        {account && <AccountInfo account={account} />}
      </div>

      <Button
        className={cn("relative ms-auto", classNames?.button)}
        disabled={isLoading}
        size="sm"
        type="button"
        variant={account ? "outline" : "default"}
        onClick={account ? handleUnlink : handleLink}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {account ? t("UNLINK") : t("LINK")}
      </Button>
    </Card>
  );
}

function AccountInfo({ account }: { account: { accountId: string } }) {
  const {
    hooks: { useAccountInfo },
  } = useAuth();

  const { data: accountInfo, isPending } = useAccountInfo({
    accountId: account.accountId,
  });

  if (isPending) {
    return <Skeleton className="my-0.5 h-3 w-28" />;
  }

  if (!accountInfo) return null;

  return <div className="text-muted-foreground text-xs">{accountInfo?.user.email}</div>;
}

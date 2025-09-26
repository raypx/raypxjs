"use client";

import { CardContent } from "@raypx/ui/components/card";
import type { SettingsCardProps } from "@raypx/ui/components/settings";
import { SettingsCard } from "@raypx/ui/components/settings";
import { cn } from "@raypx/ui/lib/utils";
import { useMemo, useState } from "react";
import { useAuth } from "../../core/hooks/use-auth";
import { ApiKeyCell } from "./api-key-cell";
import { ApiKeyDisplayDialog } from "./api-key-display-dialog";
import { CreateApiKeyDialog } from "./create-api-key-dialog";

export interface ApiKeysCardProps extends SettingsCardProps {
  organizationId?: string;
}

export function ApiKeysCard({ className, classNames, organizationId, ...props }: ApiKeysCardProps) {
  const {
    hooks: { useListApiKeys },
    t,
  } = useAuth();

  const { data: apiKeys, isPending, refetch } = useListApiKeys();

  // Filter API keys by organizationId
  const filteredApiKeys = useMemo(
    () => apiKeys?.filter((apiKey) => organizationId === apiKey.metadata?.organizationId),
    [apiKeys, organizationId]
  );

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [displayDialogOpen, setDisplayDialogOpen] = useState(false);
  const [createdApiKey, setCreatedApiKey] = useState("");

  const handleCreateApiKey = (apiKey: string) => {
    setCreatedApiKey(apiKey);
    setDisplayDialogOpen(true);
  };

  return (
    <>
      <SettingsCard
        action={() => setCreateDialogOpen(true)}
        actionLabel={t("CREATE_API_KEY")}
        className={className}
        classNames={classNames}
        description={t("API_KEYS_DESCRIPTION")}
        instructions={t("API_KEYS_INSTRUCTIONS")}
        isPending={isPending}
        title={t("API_KEYS")}
        {...props}
      >
        {filteredApiKeys && filteredApiKeys.length > 0 && (
          <CardContent className={cn("grid gap-4", classNames?.content)}>
            {filteredApiKeys?.map((apiKey) => (
              <ApiKeyCell
                apiKey={apiKey}
                classNames={classNames}
                key={apiKey.id}
                refetch={refetch}
              />
            ))}
          </CardContent>
        )}
      </SettingsCard>

      <CreateApiKeyDialog
        classNames={classNames}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateApiKey}
        open={createDialogOpen}
        organizationId={organizationId}
        refetch={refetch}
      />

      <ApiKeyDisplayDialog
        apiKey={createdApiKey}
        classNames={classNames}
        onOpenChange={setDisplayDialogOpen}
        open={displayDialogOpen}
      />
    </>
  );
}

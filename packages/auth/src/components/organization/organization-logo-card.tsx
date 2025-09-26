"use client";

import { Button } from "@raypx/ui/components/button";
import { Card } from "@raypx/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@raypx/ui/components/dropdown-menu";
import { Trash, UploadCloud } from "@raypx/ui/components/icons";
import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { SettingsCardFooter, SettingsCardHeader } from "@raypx/ui/components/settings";
import { cn } from "@raypx/ui/lib/utils";
import type { Organization } from "better-auth/plugins/organization";
import { type ComponentProps, useRef, useState } from "react";
import { useAuth } from "../../core/hooks/use-auth";
import { useCurrentOrganization } from "../../core/hooks/use-current-organization";
import { fileToBase64, resizeAndCropImage } from "../../core/lib/image-utils";
import { getLocalizedError } from "../../core/lib/utils";
import { OrganizationLogo } from "./organization-logo";

export interface OrganizationLogoCardProps extends ComponentProps<typeof Card> {
  className?: string;
  classNames?: SettingsCardClassNames;
  slug?: string;
}

export function OrganizationLogoCard({
  className,
  classNames,
  slug,
  ...props
}: OrganizationLogoCardProps) {
  const { t } = useAuth();

  const { data: organization } = useCurrentOrganization({ slug });

  if (!organization) {
    return (
      <Card className={cn("w-full pb-0 text-start", className, classNames?.base)} {...props}>
        <div className="flex justify-between">
          <SettingsCardHeader
            className="grow self-start"
            classNames={classNames}
            description={t("LOGO_DESCRIPTION")}
            isPending
            title={t("LOGO")}
          />

          <Button
            className="me-6 size-fit rounded-full"
            disabled
            size="icon"
            type="button"
            variant="ghost"
          >
            <OrganizationLogo
              className="size-20 text-2xl"
              classNames={classNames?.avatar}
              isPending
            />
          </Button>
        </div>

        <SettingsCardFooter
          className="!py-5"
          classNames={classNames}
          instructions={t("LOGO_INSTRUCTIONS")}
          isPending
        />
      </Card>
    );
  }

  return (
    <OrganizationLogoForm
      className={className}
      classNames={classNames}
      organization={organization}
      {...props}
    />
  );
}

function OrganizationLogoForm({
  className,
  classNames,
  organization,
  ...props
}: OrganizationLogoCardProps & { organization: Organization }) {
  const {
    hooks: { useHasPermission },
    t,
    organization: organizationOptions,
    mutators: { updateOrganization },
    toast,
  } = useAuth();

  const { refetch: refetchOrganization } = useCurrentOrganization({
    slug: organization.slug,
  });

  const { data: hasPermission, isPending: permissionPending } = useHasPermission({
    organizationId: organization.id,
    permissions: {
      organization: ["update"],
    },
  });

  const isPending = permissionPending;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogoChange = async (file: File) => {
    if (!(organizationOptions?.logo && hasPermission?.success)) {
      return;
    }

    setLoading(true);

    const resizedFile = await resizeAndCropImage(
      file,
      crypto.randomUUID(),
      organizationOptions.logo.size,
      organizationOptions.logo.extension
    );

    let image: string | undefined | null;

    if (organizationOptions.logo.upload) {
      image = await organizationOptions.logo.upload(resizedFile);
    } else {
      image = await fileToBase64(resizedFile);
    }

    if (!image) {
      setLoading(false);
      return;
    }

    try {
      await updateOrganization({
        organizationId: organization.id,
        data: { logo: image },
      });

      await refetchOrganization?.();
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }

    setLoading(false);
  };

  const handleDeleteLogo = async () => {
    if (!hasPermission?.success) {
      return;
    }

    setLoading(true);

    try {
      if (organization.logo) {
        await organizationOptions?.logo?.delete?.(organization.logo);
      }

      await updateOrganization({
        organizationId: organization.id,
        data: { logo: "" },
      });

      await refetchOrganization?.();
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }

    setLoading(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={cn("w-full pb-0 text-start", className, classNames?.base)} {...props}>
      <input
        accept="image/*"
        disabled={loading || !hasPermission?.success}
        hidden
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (file) {
            handleLogoChange(file);
          }

          e.target.value = "";
        }}
        ref={fileInputRef}
        type="file"
      />

      <div className="flex justify-between">
        <SettingsCardHeader
          className="grow self-start"
          classNames={classNames}
          description={t("LOGO_DESCRIPTION")}
          isPending={isPending}
          title={t("LOGO")}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="me-6 size-fit rounded-full"
              disabled={!hasPermission?.success}
              size="icon"
              type="button"
              variant="ghost"
            >
              <OrganizationLogo
                className="size-20 text-2xl"
                classNames={classNames?.avatar}
                isPending={isPending || loading}
                key={organization.logo}
                organization={organization}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem
              disabled={loading || !hasPermission?.success}
              onClick={openFileDialog}
            >
              <UploadCloud />

              {t("UPLOAD_LOGO")}
            </DropdownMenuItem>

            {organization.logo && (
              <DropdownMenuItem
                disabled={loading || !hasPermission?.success}
                onClick={handleDeleteLogo}
                variant="destructive"
              >
                <Trash />

                {t("DELETE_LOGO")}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SettingsCardFooter
        className="!py-5"
        classNames={classNames}
        instructions={t("LOGO_INSTRUCTIONS")}
        isPending={isPending}
        isSubmitting={loading}
      />
    </Card>
  );
}

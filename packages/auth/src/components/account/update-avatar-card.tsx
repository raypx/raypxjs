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
import { type ComponentProps, useRef, useState } from "react";
import { useAuth } from "../../core/hooks/use-auth";
import { fileToBase64, resizeAndCropImage } from "../../core/lib/image-utils";
import { getLocalizedError } from "../../core/lib/utils";
import { UserAvatar } from "./user-avatar";

export interface UpdateAvatarCardProps extends ComponentProps<typeof Card> {
  className?: string;
  classNames?: SettingsCardClassNames;
}

export function UpdateAvatarCard({ className, classNames, ...props }: UpdateAvatarCardProps) {
  const {
    hooks: { useSession },
    mutators: { updateUser },
    optimistic,
    avatar,
    toast,
    t,
  } = useAuth();

  const { data: sessionData, isPending, refetch } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = async (file: File) => {
    if (!(sessionData && avatar)) {
      return;
    }

    setLoading(true);
    const resizedFile = await resizeAndCropImage(
      file,
      crypto.randomUUID(),
      avatar.size,
      avatar.extension
    );

    let image: string | undefined | null;

    if (avatar.upload) {
      image = await avatar.upload(resizedFile);
    } else {
      image = await fileToBase64(resizedFile);
    }

    if (!image) {
      setLoading(false);
      return;
    }

    if (optimistic && !avatar.upload) {
      setLoading(false);
    }

    try {
      await updateUser({ image });
      await refetch?.();
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }

    setLoading(false);
  };

  const handleDeleteAvatar = async () => {
    if (!sessionData) {
      return;
    }

    setLoading(true);

    try {
      // If a custom storage remover is provided, attempt to clean up the old asset first
      if (sessionData.user.image && avatar?.delete) {
        await avatar.delete(sessionData.user.image);
      }

      await updateUser({ image: null });
      await refetch?.();
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }

    setLoading(false);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <Card className={cn("w-full pb-0 text-start", className, classNames?.base)} {...props}>
      <input
        accept="image/*"
        disabled={loading}
        hidden
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (file) {
            handleAvatarChange(file);
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
          description={t("AVATAR_DESCRIPTION")}
          isPending={isPending}
          title={t("AVATAR")}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="me-6 size-fit rounded-full" size="icon" variant="ghost">
              <UserAvatar
                className="size-20 text-2xl"
                classNames={classNames?.avatar}
                isPending={isPending || loading}
                key={sessionData?.user.image}
                user={sessionData?.user}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem disabled={loading} onClick={openFileDialog}>
              <UploadCloud />
              {t("UPLOAD_AVATAR")}
            </DropdownMenuItem>
            {sessionData?.user.image && (
              <DropdownMenuItem
                disabled={loading}
                onClick={handleDeleteAvatar}
                variant="destructive"
              >
                <Trash />
                {t("DELETE_AVATAR")}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SettingsCardFooter
        className="!py-5"
        classNames={classNames}
        instructions={t("AVATAR_INSTRUCTIONS")}
        isPending={isPending}
        isSubmitting={loading}
      />
    </Card>
  );
}

"use client";

import { Button } from "@raypx/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@raypx/ui/components/dialog";
import { CheckIcon, CopyIcon } from "@raypx/ui/components/icons";
import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { cn } from "@raypx/ui/lib/utils";
import { type ComponentProps, useState } from "react";
import { useAuth } from "../../core/hooks/use-auth";

interface ApiKeyDisplayDialogProps extends ComponentProps<typeof Dialog> {
  classNames?: SettingsCardClassNames;
  apiKey: string;
}

export function ApiKeyDisplayDialog({
  classNames,
  apiKey,
  onOpenChange,
  ...props
}: ApiKeyDisplayDialogProps) {
  const { t } = useAuth();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent
        className={classNames?.dialog?.content}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className={classNames?.dialog?.header}>
          <DialogTitle className={cn("text-lg md:text-xl", classNames?.title)}>
            {t("API_KEY_CREATED")}
          </DialogTitle>

          <DialogDescription className={cn("text-xs md:text-sm", classNames?.description)}>
            {t("CREATE_API_KEY_SUCCESS")}
          </DialogDescription>
        </DialogHeader>

        <div className="break-all rounded-md bg-muted p-4 font-mono text-sm">{apiKey}</div>

        <DialogFooter className={classNames?.dialog?.footer}>
          <Button
            className={cn(classNames?.button, classNames?.outlineButton)}
            disabled={copied}
            onClick={handleCopy}
            type="button"
            variant="outline"
          >
            {copied ? (
              <>
                <CheckIcon className={classNames?.icon} />
                {t("COPIED_TO_CLIPBOARD")}
              </>
            ) : (
              <>
                <CopyIcon className={classNames?.icon} />
                {t("COPY_TO_CLIPBOARD")}
              </>
            )}
          </Button>

          <Button
            className={cn(classNames?.button, classNames?.primaryButton)}
            onClick={() => onOpenChange?.(false)}
            type="button"
            variant="default"
          >
            {t("DONE")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

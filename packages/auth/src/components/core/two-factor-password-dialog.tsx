"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@raypx/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@raypx/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@raypx/ui/components/form";
import { Loader2 } from "@raypx/ui/components/icons";
import { PasswordField } from "@raypx/ui/components/password-field";
import type { SettingsCardClassNames } from "@raypx/ui/components/settings";
import { cn } from "@raypx/ui/lib/utils";
import { type ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useAuth } from "../../core/hooks/use-auth";
import { getLocalizedError } from "../../core/lib/utils";
import { BackupCodesDialog } from "./backup-codes-dialog";

interface TwoFactorPasswordDialogProps extends ComponentProps<typeof Dialog> {
  classNames?: SettingsCardClassNames;
  isTwoFactorEnabled: boolean;
}

export function TwoFactorPasswordDialog({
  classNames,
  onOpenChange,
  isTwoFactorEnabled,
  ...props
}: TwoFactorPasswordDialogProps) {
  const { t, authClient, basePath, viewPaths, navigate, toast, twoFactor } = useAuth();
  const [showBackupCodesDialog, setShowBackupCodesDialog] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [totpURI, setTotpURI] = useState<string | null>(null);

  const formSchema = z.object({
    password: z.string().min(1, { message: t("PASSWORD_REQUIRED") }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function enableTwoFactor({ password }: z.infer<typeof formSchema>) {
    try {
      const response = await authClient.twoFactor.enable({
        password,
        fetchOptions: { throw: true },
      });

      onOpenChange?.(false);
      setBackupCodes(response.backupCodes);

      if (twoFactor?.includes("totp")) {
        setTotpURI(response.totpURI);
      }

      setTimeout(() => {
        setShowBackupCodesDialog(true);
      }, 250);
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }
  }

  async function disableTwoFactor({ password }: z.infer<typeof formSchema>) {
    try {
      await authClient.twoFactor.disable({
        password,
        fetchOptions: { throw: true },
      });

      toast({
        variant: "success",
        message: t("TWO_FACTOR_DISABLED"),
      });

      onOpenChange?.(false);
    } catch (error) {
      toast({
        variant: "error",
        message: getLocalizedError({ error, t }),
      });
    }
  }

  return (
    <>
      <Dialog onOpenChange={onOpenChange} {...props}>
        <DialogContent className={cn("sm:max-w-md", classNames?.dialog)}>
          <DialogHeader className={classNames?.dialog?.header}>
            <DialogTitle className={classNames?.title}>{t("TWO_FACTOR")}</DialogTitle>

            <DialogDescription className={classNames?.description}>
              {isTwoFactorEnabled
                ? t("TWO_FACTOR_DISABLE_INSTRUCTIONS")
                : t("TWO_FACTOR_ENABLE_INSTRUCTIONS")}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(isTwoFactorEnabled ? disableTwoFactor : enableTwoFactor)}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={classNames?.label}>{t("PASSWORD")}</FormLabel>
                    <FormControl>
                      <PasswordField
                        autoComplete="current-password"
                        className={classNames?.input}
                        placeholder={t("PASSWORD_PLACEHOLDER")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={classNames?.error} />
                  </FormItem>
                )}
              />

              <DialogFooter className={classNames?.dialog?.footer}>
                <Button
                  className={cn(classNames?.button, classNames?.secondaryButton)}
                  onClick={() => onOpenChange?.(false)}
                  type="button"
                  variant="secondary"
                >
                  {t("CANCEL")}
                </Button>

                <Button
                  className={cn(classNames?.button, classNames?.primaryButton)}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting && <Loader2 className="animate-spin" />}
                  {isTwoFactorEnabled ? t("DISABLE_TWO_FACTOR") : t("ENABLE_TWO_FACTOR")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <BackupCodesDialog
        backupCodes={backupCodes}
        classNames={classNames}
        onOpenChange={(open) => {
          setShowBackupCodesDialog(open);

          if (!open) {
            const url = `${basePath}/${viewPaths.TWO_FACTOR}`;
            navigate(twoFactor?.includes("totp") && totpURI ? `${url}?totpURI=${totpURI}` : url);
          }
        }}
        open={showBackupCodesDialog}
      />
    </>
  );
}

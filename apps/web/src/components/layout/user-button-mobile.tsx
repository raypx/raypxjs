"use client";

import { useAuth } from "@raypx/auth/core";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@raypx/ui/components/drawer";
import { toast } from "@raypx/ui/components/toast";
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserAvatar } from "@/components/layout/user-avatar";
import { LocaleLink, useLocaleRouter } from "@/components/link";
import { getAvatarLinks } from "@/config/avatar.config";

export function UserButtonMobile() {
  const t = useTranslations();
  const avatarLinks = getAvatarLinks();
  const localeRouter = useLocaleRouter();
  const [open, setOpen] = useState(false);
  const closeDrawer = () => {
    setOpen(false);
  };
  const {
    hooks: { useSession },
    authClient,
  } = useAuth();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("sign out success");
          // TanStack Query automatically handles cache invalidation on sign out
          localeRouter.replace("/");
        },
        onError: (error) => {
          console.error("sign out error:", error);
          toast.error(t("common.logoutFailed"));
        },
      },
    });
  };

  return (
    <Drawer onClose={closeDrawer} open={open}>
      <DrawerTrigger onClick={() => setOpen(true)}>
        {session?.user && (
          <UserAvatar
            className="size-8 cursor-pointer border"
            image={session?.user.image}
            name={session?.user.name}
          />
        )}
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-40 bg-background/50" />
        <DrawerContent className="fixed inset-x-0 bottom-0 z-50 mt-24 overflow-hidden rounded-t-[10px] border bg-background px-3 text-sm">
          <DrawerHeader>
            <DrawerTitle />
          </DrawerHeader>
          <div className="flex items-center justify-start gap-4 p-2">
            {session?.user && (
              <UserAvatar
                className="size-8 cursor-pointer border"
                image={session?.user.image}
                name={session?.user.name}
              />
            )}
            <div className="flex flex-col">
              <p className="font-medium">{session?.user.name}</p>
              <p className="w-[200px] truncate text-muted-foreground">{session?.user.email}</p>
            </div>
          </div>

          <ul className="mt-1 mb-14 w-full text-muted-foreground">
            {avatarLinks?.map((item) => (
              <li className="rounded-lg text-foreground hover:bg-muted" key={item.title}>
                <LocaleLink
                  className="flex w-full items-center gap-3 px-2.5 py-2"
                  href={item.href || "#"}
                  onClick={closeDrawer}
                >
                  {item.icon ? item.icon : null}
                  <p className="text-sm">{item.title}</p>
                </LocaleLink>
              </li>
            ))}

            <li className="rounded-lg text-foreground hover:bg-muted" key="logout">
              <button
                className="flex w-full items-center gap-3 px-2.5 py-2"
                onClick={async (event) => {
                  event.preventDefault();
                  closeDrawer();
                  await handleSignOut();
                }}
                type="button"
              >
                <LogOutIcon className="size-4" />
                <p className="text-sm">{t("common.logout")}</p>
              </button>
            </li>
          </ul>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

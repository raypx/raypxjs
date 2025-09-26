"use client";

import { AuthView } from "@raypx/auth/core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@raypx/ui/components/dialog";
import { useEffect, useState } from "react";
import { useRouter as useLocaleRouter } from "@/components/link";
import { Routes } from "@/config/routes.config";

type LoginWrapperProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  callbackUrl?: string;
};

export const LoginWrapper = ({
  children,
  mode = "redirect",
  asChild,
  callbackUrl,
}: LoginWrapperProps) => {
  const router = useLocaleRouter();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    // append callbackUrl as a query parameter if provided
    const loginPath = callbackUrl
      ? `${Routes.Login}?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : `${Routes.Login}`;
    console.log("login wrapper, loginPath", loginPath);
    router.push(loginPath);
  };

  // this is to prevent the login wrapper from being rendered on the server side
  // and causing a hydration error
  if (!mounted) {
    return null;
  }

  if (mode === "modal") {
    return (
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 sm:max-w-[400px]">
          <DialogHeader className="hidden">
            <DialogTitle />
          </DialogHeader>
          <AuthView className="border-none" view="SIGN_IN" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <button
      className="cursor-pointer border-none bg-transparent p-0"
      onClick={handleLogin}
      type="button"
    >
      {children}
    </button>
  );
};

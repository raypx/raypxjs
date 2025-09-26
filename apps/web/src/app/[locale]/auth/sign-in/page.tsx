import { AuthView } from "@raypx/auth/core";
import { createMetadata } from "@raypx/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async (): Promise<Metadata> =>
  createMetadata({
    title: "Sign In",
  });

export default function SignInPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="z-10 flex w-full max-w-sm flex-col gap-6">
        <Link className="flex items-center gap-2 self-center font-medium" href="/">
          <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full text-primary-foreground">
            <Image
              alt="Raypx"
              className="object-cover"
              height={24}
              src="/images/logo.png"
              width={24}
            />
          </div>
          Raypx
        </Link>
        <AuthView socialLayout="grid" view="SIGN_IN" />
      </div>
    </div>
  );
}

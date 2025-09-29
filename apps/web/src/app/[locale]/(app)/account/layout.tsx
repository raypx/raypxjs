import { RedirectToSignIn } from "@raypx/auth/core";
import { createMetadata } from "@raypx/seo";
import { ChevronRight, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Header } from "@/layouts/console/header";

export const generateMetadata = async (): Promise<Metadata> =>
  createMetadata({
    title: "Account",
  });

export default function AccountLayout(props: React.PropsWithChildren) {
  return (
    <>
      <RedirectToSignIn />
      <div className="min-h-screen bg-background">
        <Header />
        <div className="border-b bg-muted/50">
          <div className="container mx-auto px-6 py-2">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center space-x-1 text-muted-foreground text-sm"
            >
              <Link
                aria-label="Go to home page"
                className="flex items-center rounded transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                href="/"
              >
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
              <span aria-current="location" className="text-foreground">
                Account
              </span>
            </nav>
          </div>
        </div>
        <main className="container mx-auto px-6 py-8">{props.children}</main>
      </div>
    </>
  );
}

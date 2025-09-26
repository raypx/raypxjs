"use client";

import { cn } from "@raypx/ui/lib/utils";
import { useTranslations } from "next-intl";
import type React from "react";
import Container from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { ModeSwitcherHorizontal } from "@/components/layout/mode-switcher-horizontal";
import { Link as LocaleLink } from "@/components/link";
import { getFooterLinks } from "@/config/footer.config";
import { getSocialLinks } from "@/config/social.config";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("layout");
  const footerLinks = getFooterLinks();
  const socialLinks = getSocialLinks();

  return (
    <footer className={cn("border-t", className)}>
      <Container className="px-4">
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-6">
          <div className="col-span-full flex flex-col items-start md:col-span-2">
            <div className="space-y-4">
              {/* logo and name */}
              <div className="flex items-center space-x-2">
                <Logo />
                <span className="font-semibold text-xl">Raypx</span>
              </div>

              {/* tagline */}
              <p className="py-2 text-base text-muted-foreground md:pr-12">{t("footer.tagline")}</p>

              {/* social links */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  {socialLinks?.map((link) => (
                    <a
                      aria-label={link.title}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-accent hover:text-accent-foreground"
                      href={link.href || "#"}
                      key={link.title}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="sr-only">{link.title}</span>
                      {link.icon ? link.icon : null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {footerLinks?.map((section) => (
            <div className="col-span-1 items-start md:col-span-1" key={section.title}>
              <span className="font-semibold text-sm uppercase">{section.title}</span>
              <ul className="mt-4 list-inside space-y-3">
                {section.items?.map(
                  (item) =>
                    item.href && (
                      <li key={item.title}>
                        <LocaleLink
                          className="text-muted-foreground text-sm hover:text-primary"
                          href={item.href || "#"}
                          target={item.external ? "_blank" : undefined}
                        >
                          {item.title}
                        </LocaleLink>
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t py-8">
        <Container className="flex items-center justify-between gap-x-4 px-4">
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Raypx All Rights Reserved.
          </span>

          <div className="flex items-center gap-x-4">
            <ModeSwitcherHorizontal />
          </div>
        </Container>
      </div>
    </footer>
  );
}

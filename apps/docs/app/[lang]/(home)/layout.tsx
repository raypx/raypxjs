import { HomeLayout } from "fumadocs-ui/layouts/home";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.shared";

interface HomeLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: HomeLayoutProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "docs" });
  return <HomeLayout {...baseOptions(lang, t)}>{children}</HomeLayout>;
}

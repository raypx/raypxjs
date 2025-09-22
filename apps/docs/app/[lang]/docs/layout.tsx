import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.shared";
import { source } from "@/lib/source";

interface DocsLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: DocsLayoutProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "docs" });
  const docsOptions = baseOptions(lang, t);
  return (
    <DocsLayout tree={source.pageTree[lang]} {...docsOptions}>
      {children}
    </DocsLayout>
  );
}

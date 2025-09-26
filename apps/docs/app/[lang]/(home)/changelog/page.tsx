import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import appConfig from "@/config/app.config";
import { changelogSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { ChangelogCard } from "./_components/card";

type ChangelogPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: ChangelogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
  });
  const title = t("changelog.title");
  const description = t("changelog.description", { name: appConfig.name });

  return {
    title,
    description,
  };
}

export default async function ChangelogPage({ params }: ChangelogPageProps) {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
  });

  // Get all changelog entries
  const entries = changelogSource
    .getPages(lang)
    .filter((i) => i.data.published)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  if (!entries.length) {
    notFound();
  }

  const title = t("changelog.title");
  const description = t("changelog.description", { name: appConfig.name });

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl">{title}</h1>
        <p className="text-muted-foreground text-xl">{description}</p>
      </div>

      <div className="space-y-12">
        {entries.map((entry, index) => (
          <div className="relative" key={entry.url}>
            {index !== entries.length - 1 && (
              <div className="absolute top-16 left-6 h-full w-0.5 bg-border" />
            )}
            <ChangelogCard
              body={<entry.data.body components={getMDXComponents()} />}
              date={entry.data.date}
              description={entry.data.description}
              key={entry.url}
              title={entry.data.title}
              version={entry.data.version}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

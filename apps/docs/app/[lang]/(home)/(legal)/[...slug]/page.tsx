import { dayjs } from "@raypx/shared/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import appConfig from "@/config/app.config";
import { pagesSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

type PageProps = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return pagesSource.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = pagesSource.getPage(slug, lang);

  if (!page) {
    notFound();
  }

  const title = `${page.data.title} | ${appConfig.name}`;
  const description = page.data.description || `${page.data.title} - ${appConfig.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: page.data.date ? dayjs(page.data.date).locale(lang).format("LL") : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, lang } = await params;
  const page = pagesSource.getPage(slug, lang);

  if (!page) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-12">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="mb-4 font-bold text-4xl">{page.data.title}</h1>

        {page.data.description && (
          <p className="text-lg text-muted-foreground">{page.data.description}</p>
        )}

        {page.data.date && (
          <div className="mt-4 text-muted-foreground text-sm">
            {dayjs(page.data.date).locale(lang).format("LL")}
          </div>
        )}
      </header>

      {/* Page Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <page.data.body components={getMDXComponents()} />
      </article>
    </div>
  );
}

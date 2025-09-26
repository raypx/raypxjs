import { dayjs } from "@raypx/shared/utils";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPathname } from "@/components/link";
import appConfig from "@/config/app.config";
import { blogSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

type BlogPostPageProps = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) {
    notFound();
  }

  const title = `${page.data.title} | ${appConfig.name}`;
  const description =
    page.data.description ||
    `${lang === "zh" ? "来自" : "From"} ${appConfig.name} ${lang === "zh" ? "的博客文章" : "blog"}`;

  return {
    title,
    description,
    authors: [{ name: appConfig.name }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: page.data.date.toISOString(),
      authors: [appConfig.name],
    },
    alternates: {
      canonical: getPathname({ href: page.url, locale: lang }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) {
    notFound();
  }

  const formattedDate = dayjs(page.data.date).locale(lang).format("LL");

  const backText = lang === "zh" ? "返回博客" : "Back to Blog";

  return (
    <div className="container max-w-4xl py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
          href={getPathname({ href: "/blog", locale: lang })}
        >
          <ArrowLeft className="h-4 w-4" />
          {backText}
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="mb-4 font-bold text-4xl">{page.data.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={page.data.date.toISOString()}>{formattedDate}</time>
          </div>
        </div>

        {page.data.description && (
          <p className="mt-4 text-lg text-muted-foreground">{page.data.description}</p>
        )}
      </header>

      {/* Article Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <page.data.body components={getMDXComponents()} />
      </article>

      {/* Article Footer */}
      <footer className="mt-12 border-t pt-8">
        <div className="flex justify-between">
          <Link
            className="text-muted-foreground text-sm hover:text-foreground"
            href={getPathname({ href: "/blog", locale: lang })}
          >
            ← {backText}
          </Link>

          <div className="text-muted-foreground text-sm">
            {lang === "zh" ? "更新于 " : "Updated on "}
            <time dateTime={page.data.date.toISOString()}>{formattedDate}</time>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { locales } from "@raypx/i18n/routing";
import type { MetadataRoute } from "next";
import appConfig from "@/config/app.config";
import { blogSource, changelogSource, pagesSource, source } from "@/lib/source";

export const revalidate = false;

export default function sitemap(): Promise<MetadataRoute.Sitemap> | MetadataRoute.Sitemap {
  const url = (path: string): string => new URL(path, appConfig.url).toString();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
  for (const locale of locales) {
    sitemapEntries.push(
      {
        url: url(`/${locale}`),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: url(`/${locale}/docs`),
        changeFrequency: "weekly",
        priority: 0.9,
      }
    );
  }

  // Add documentation pages
  for (const locale of locales) {
    for (const page of source.getPages()) {
      const { lastModified } = page.data;
      sitemapEntries.push({
        url: url(`/${locale}${page.url}`),
        lastModified: lastModified ? new Date(lastModified) : undefined,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Add blog pages
  const blogPosts = blogSource.getPages();
  if (blogPosts.length > 0) {
    for (const locale of locales) {
      // Blog index page
      sitemapEntries.push({
        url: url(`/${locale}/blog`),
        changeFrequency: "weekly",
        priority: 0.7,
      });

      // Individual blog posts
      for (const post of blogPosts) {
        if (post.data.published !== false) {
          sitemapEntries.push({
            url: url(`/${locale}${post.url}`),
            lastModified: new Date(post.data.date),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  }

  // Add changelog pages
  const changelogEntries = changelogSource.getPages();
  if (changelogEntries.length > 0) {
    for (const locale of locales) {
      // Changelog index page
      sitemapEntries.push({
        url: url(`/${locale}/changelog`),
        changeFrequency: "weekly",
        priority: 0.7,
      });

      // Individual changelog entries
      for (const entry of changelogEntries) {
        if (entry.data.published !== false) {
          sitemapEntries.push({
            url: url(`/${locale}${entry.url}`),
            lastModified: new Date(entry.data.date),
            changeFrequency: "monthly",
            priority: 0.5,
          });
        }
      }
    }
  }

  // Add static pages
  const staticPages = pagesSource.getPages();
  for (const page of staticPages) {
    if (page.data.published !== false) {
      for (const locale of locales) {
        sitemapEntries.push({
          url: url(`/${locale}/pages${page.url}`),
          lastModified: page.data.date ? new Date(page.data.date) : undefined,
          changeFrequency: "monthly",
          priority: 0.4,
        });
      }
    }
  }

  return sitemapEntries;
}

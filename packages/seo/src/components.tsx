import type { NextSeoProps } from "next-seo";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  NextSeo,
  OrganizationJsonLd,
  SiteLinksSearchBoxJsonLd,
  WebPageJsonLd,
} from "next-seo";
import type { ReactNode } from "react";
import type { SEOConfig } from "./metadata";
import { createSEOProps } from "./metadata";
import type { StructuredDataType } from "./structured-data";

export type ArticleProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName?: string;
  publisherLogo?: string;
  images?: string[];
  children?: ReactNode;
};

export function Article({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  publisherName = "Raypx",
  publisherLogo,
  images = [],
  children,
}: ArticleProps) {
  return (
    <>
      <ArticleJsonLd
        authorName={[authorName]}
        dateModified={dateModified || datePublished}
        datePublished={datePublished}
        description={description}
        images={images}
        publisherLogo={publisherLogo}
        publisherName={publisherName}
        title={title}
        url={url}
      />
      {children}
    </>
  );
}

export type BreadcrumbProps = {
  itemListElements: Array<{
    position: number;
    name: string;
    item: string;
  }>;
  children?: ReactNode;
};

export function Breadcrumb({ itemListElements, children }: BreadcrumbProps) {
  return (
    <>
      <BreadcrumbJsonLd itemListElements={itemListElements} />
      {children}
    </>
  );
}

export type OrganizationProps = {
  type?: string;
  id?: string;
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoints?: Array<{
    telephone: string;
    contactType: string;
    areaServed?: string[];
    availableLanguage?: string[];
  }>;
  children?: ReactNode;
};

export function Organization({
  type = "Organization",
  id,
  name,
  url,
  logo,
  sameAs = [],
  contactPoints = [],
  children,
}: OrganizationProps) {
  return (
    <>
      <OrganizationJsonLd
        contactPoint={contactPoints}
        id={id}
        logo={logo}
        name={name}
        sameAs={sameAs}
        type={type}
        url={url}
      />
      {children}
    </>
  );
}

export type WebPageProps = {
  url: string;
  description: string;
  lastReviewed?: string;
  reviewedBy?: {
    type: string;
    name: string;
  };
  children?: ReactNode;
};

export function WebPage({ url, description, lastReviewed, reviewedBy, children }: WebPageProps) {
  return (
    <>
      <WebPageJsonLd
        description={description}
        id={url}
        lastReviewed={lastReviewed}
        reviewedBy={reviewedBy}
      />
      {children}
    </>
  );
}

export type SiteSearchProps = {
  url: string;
  children?: ReactNode;
};

export function SiteSearch({ url, children }: SiteSearchProps) {
  return (
    <>
      <SiteLinksSearchBoxJsonLd
        potentialActions={[
          {
            target: `${url}/search?q={search_term_string}`,
            queryInput: "required name=search_term_string",
          },
        ]}
        url={url}
      />
      {children}
    </>
  );
}

// Core SEO components from components.tsx
export interface SEOProviderProps extends SEOConfig {
  children?: ReactNode;
  structuredData?: StructuredDataType[];
}

export function SEOProvider({ children, structuredData = [], ...seoConfig }: SEOProviderProps) {
  const seoProps = createSEOProps(seoConfig);

  return (
    <>
      <NextSeo {...seoProps} />
      {structuredData.map((data, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      {children}
    </>
  );
}

export interface PageSEOProps extends NextSeoProps {
  structuredData?: StructuredDataType[];
}

export function PageSEO({ structuredData = [], ...seoProps }: PageSEOProps) {
  return (
    <>
      <NextSeo {...seoProps} />
      {structuredData.map((data, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  );
}

export interface ArticleSEOProps extends SEOConfig {
  structuredData?: StructuredDataType[];
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}

export function ArticleSEO({
  structuredData = [],
  datePublished,
  dateModified,
  author,
  url,
  ...seoConfig
}: ArticleSEOProps) {
  const seoProps = createSEOProps({
    ...seoConfig,
    openGraph: {
      type: "article",
      ...seoConfig.openGraph,
    },
  });

  return (
    <>
      <NextSeo
        {...seoProps}
        openGraph={{
          ...seoProps.openGraph,
          article: {
            publishedTime: datePublished,
            modifiedTime: dateModified || datePublished,
            ...(author && { authors: [author] }),
          },
        }}
      />
      {structuredData.map((data, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  );
}

export type JsonLdProps = {
  data: StructuredDataType;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />
  );
}

// Re-export all next-seo JSON-LD components
export {
  ArticleJsonLd,
  BrandJsonLd,
  BreadcrumbJsonLd,
  CampgroundJsonLd,
  CarouselJsonLd,
  CollectionPageJsonLd,
  CorporateContactJsonLd,
  CourseJsonLd,
  DatasetJsonLd,
  DefaultSeo,
  EventJsonLd,
  FAQPageJsonLd,
  HowToJsonLd,
  ImageJsonLd,
  JobPostingJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  NewsArticleJsonLd,
  OrganizationJsonLd,
  ParkJsonLd,
  ProductJsonLd,
  ProfilePageJsonLd,
  QAPageJsonLd,
  RecipeJsonLd,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
  SoftwareAppJsonLd,
  VideoGameJsonLd,
  VideoJsonLd,
  WebPageJsonLd,
} from "next-seo";

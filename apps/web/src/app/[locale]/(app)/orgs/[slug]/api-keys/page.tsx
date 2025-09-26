import { OrganizationView } from "@raypx/auth/organization";
import { createMetadata } from "@raypx/seo";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> =>
  createMetadata({
    title: "API Keys",
  });

type ApiKeysPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ApiKeysPage({ params }: ApiKeysPageProps) {
  const { slug } = await params;
  return <OrganizationView slug={slug} view="API_KEYS" />;
}

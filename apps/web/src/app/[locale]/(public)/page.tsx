import { createMetadata } from "@raypx/seo";
import type { Metadata } from "next";
import appConfig from "@/config/app.config";
import CallToActionSection from "./_components/calltoaction";
import { CTASection } from "./_components/cta-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";

export const generateMetadata = async (): Promise<Metadata> =>
  createMetadata({
    title: `${appConfig.name} - Build AI-Powered Applications`,
    description:
      "The complete platform for building, deploying, and scaling AI-powered applications with enterprise-grade security and performance.",
    keywords: [
      ...appConfig.keywords,
      "AI platform",
      "development",
      "machine learning",
      "enterprise",
    ],
  });

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <CallToActionSection />
      </main>
    </div>
  );
}

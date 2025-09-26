import { Button } from "@raypx/ui/components/button";
import Link from "next/link";
import appConfig from "@/config/app.config";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 font-bold text-4xl">Welcome to Raypx</h1>
      <p className="mx-auto mb-6 max-w-2xl text-fd-muted-foreground">
        A modern web application platform built with Next.js and TypeScript for building AI-powered
        applications.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/docs">
          <Button className="cursor-pointer">Get Started</Button>
        </Link>
        <Link href={appConfig.url}>
          <Button className="cursor-pointer" variant="outline">
            Visit Website
          </Button>
        </Link>
      </div>
    </main>
  );
}

import { Button } from "@raypx/ui/components/button";
import Link from "next/link";
import appConfig from "@/config/app.config";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/10" />
        <div className="absolute top-40 right-10 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/10" />
        <div className="-translate-x-1/2 absolute bottom-20 left-1/2 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl dark:bg-pink-600/10" />
      </div>

      <main className="relative flex flex-1 flex-col justify-center px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Hero section */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-700 text-sm dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              ✨ Modern AI-Powered Platform
            </div>

            <h1 className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text font-bold text-5xl text-transparent md:text-7xl dark:from-white dark:via-blue-200 dark:to-purple-200">
              Welcome to Raypx
            </h1>

            <p className="mx-auto max-w-3xl text-gray-600 text-lg md:text-xl dark:text-gray-300">
              A modern web application platform built with Next.js and TypeScript for building
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {" "}
                AI-powered applications
              </span>
              . Start building the future today.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/docs">
              <Button
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                size="lg"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-200 group-hover:opacity-20" />
              </Button>
            </Link>
            <Link href={appConfig.url}>
              <Button
                className="border-gray-300 px-8 py-3 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                size="lg"
                variant="outline"
              >
                Visit Website
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/60">
              <div className="mb-3 text-2xl">🚀</div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Fast Development</h3>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Built with modern tools and best practices for rapid development
              </p>
            </div>

            <div className="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/60">
              <div className="mb-3 text-2xl">🤖</div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">AI-Powered</h3>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Integrate AI capabilities seamlessly into your applications
              </p>
            </div>

            <div className="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/60">
              <div className="mb-3 text-2xl">⚡</div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">High Performance</h3>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Optimized for speed and scalability with TypeScript
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

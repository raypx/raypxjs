"use client";

import { Github, Globe, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-gray-200 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
                <span className="font-bold text-sm text-white">R</span>
              </div>
              <span className="font-bold text-xl dark:text-white">Raypx</span>
            </div>
            <p className="text-gray-600 text-sm dark:text-gray-300">
              The complete platform for building AI-powered applications.
            </p>
            <div className="flex items-center gap-4">
              <Link
                className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                href="#"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                href="#"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                href="#"
              >
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Product</h3>
            <div className="space-y-2">
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Features
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Pricing
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Documentation
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                API Reference
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Company</h3>
            <div className="space-y-2">
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                About
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Blog
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Careers
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Legal</h3>
            <div className="space-y-2">
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="/privacy"
              >
                Privacy
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="/terms"
              >
                Terms
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Security
              </Link>
              <Link
                className="block text-gray-600 text-sm transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="#"
              >
                Status
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-gray-200 border-t pt-8 text-center text-gray-600 text-sm dark:border-gray-800 dark:text-gray-300">
          <p>© 2025 Raypx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

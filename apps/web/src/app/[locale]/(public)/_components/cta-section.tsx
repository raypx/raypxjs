"use client";

import { useAuth } from "@raypx/auth/core";
import { Button } from "@raypx/ui/components/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Free tier with generous limits",
  "No setup or maintenance required",
  "Scale from prototype to production",
  "24/7 expert support",
];

export function CTASection() {
  const {
    viewPaths: pages,
    hooks: { useSession },
  } = useAuth();
  const { data: session } = useSession();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="space-y-8 text-white">
          <div className="space-y-4">
            <h2 className="font-bold text-3xl md:text-4xl">Ready to build the future?</h2>
            <p className="text-blue-100 text-xl">
              Join thousands of developers already building amazing AI applications with Raypx.
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 text-left md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div className="flex items-center gap-3" key={index}>
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-blue-100">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            {session?.session ? (
              <Link href="/console">
                <Button
                  className="min-w-48 gap-2 bg-white font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:text-blue-700 hover:shadow-xl"
                  size="lg"
                  variant="secondary"
                >
                  Go to Console
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href={pages.SIGN_UP}>
                  <Button
                    className="group min-w-48 gap-2 bg-white font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:text-blue-700 hover:shadow-xl"
                    size="lg"
                    variant="secondary"
                  >
                    Start Building Today
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={pages.SIGN_IN}>
                  <Button
                    className="min-w-48 border-2 border-white bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-blue-600 hover:shadow-lg"
                    size="lg"
                    variant="outline"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          <p className="text-blue-200 text-sm">
            Start free • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

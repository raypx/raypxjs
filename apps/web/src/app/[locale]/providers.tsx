"use client";

import { AnalyticsProvider } from "@raypx/analytics";
import { AuthProvider } from "@raypx/auth";
import { client } from "@raypx/auth/client";
import { Provider } from "@raypx/ui/components/provider";
import { useRouter } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { authPages } from "@/config/auth.config";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export function Providers({ children, locale, messages }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Provider>
        <AnalyticsProvider>
          <AuthProvider
            authClient={client}
            basePath="/auth"
            credentials={{
              username: true,
              rememberMe: true,
            }}
            locale={locale}
            navigate={router.push}
            onSessionChange={() => {
              router.refresh();
            }}
            organization={{
              pathMode: "slug",
              basePath: "/orgs",
              apiKey: true,
              logo: true,
            }}
            replace={router.replace}
            signUp={true}
            social={{
              providers: ["google", "github"],
            }}
            viewPaths={authPages}
          >
            {children}
          </AuthProvider>
        </AnalyticsProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}

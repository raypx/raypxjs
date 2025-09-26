import { Button } from "@raypx/ui/components/button";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/layout/logo";
import { LocaleLink } from "@/components/link";

/**
 * Note that `app/[locale]/[...rest]/page.tsx`
 * is necessary for this page to render.
 *
 * https://next-intl.dev/docs/environments/error-files#not-foundjs
 * https://next-intl.dev/docs/environments/error-files#catching-non-localized-requests
 */
export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Logo className="size-12" />

      <h1 className="font-bold text-4xl">{t("title")}</h1>

      <p className="text-balance px-4 text-center font-medium text-xl">{t("message")}</p>

      <Button asChild className="cursor-pointer" size="lg" variant="default">
        <LocaleLink href="/">{t("backToHome")}</LocaleLink>
      </Button>
    </div>
  );
}

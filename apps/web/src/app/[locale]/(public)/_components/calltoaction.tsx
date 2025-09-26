import { Button } from "@raypx/ui/components/button";
import { useTranslations } from "next-intl";
import { LocaleLink } from "@/components/link";

export default function CallToActionSection() {
  const t = useTranslations("common.calltoaction");

  return (
    <section className="bg-muted/50 px-4 py-24" id="call-to-action">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance font-semibold text-4xl lg:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <LocaleLink href="/">
                <span>{t("primaryButton")}</span>
              </LocaleLink>
            </Button>

            <Button asChild size="lg" variant="outline">
              <LocaleLink href="/">
                <span>{t("secondaryButton")}</span>
              </LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

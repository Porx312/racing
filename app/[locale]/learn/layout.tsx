import { getTranslations, setRequestLocale } from "next-intl/server";
import { LearnShell } from "@/components/layout/LearnShell";
import { resolveLocale } from "@/lib/locale";

type LearnLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LearnLayout({
  children,
  params,
}: LearnLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("learn");

  return (
    <LearnShell
      tocLabel={t("toc")}
      openLabel={t("openMenu")}
      closeLabel={t("closeMenu")}
    >
      {children}
    </LearnShell>
  );
}

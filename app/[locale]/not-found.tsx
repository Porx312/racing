import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-col items-start justify-center px-4">
      <p className="font-mono text-[11px] tracking-[0.24em] text-green-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-neutral-50">{t("title")}</h1>
      <p className="mt-2 text-neutral-400">{t("body")}</p>
      <Link
        href="/"
        className="mt-6 bg-green-400 px-4 py-2 text-sm font-semibold text-black"
      >
        {t("cta")}
      </Link>
    </div>
  );
}

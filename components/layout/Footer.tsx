import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-neutral-800 bg-black">
      <div className="flex w-full flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wider text-green-500">
          {t("rights")}
        </p>
        <p className="text-sm text-neutral-500">{t("tagline")}</p>
      </div>
    </footer>
  );
}

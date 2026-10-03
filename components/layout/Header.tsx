import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black">
      <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-green-500" aria-hidden />
        <Logo />
        <nav className="flex items-center gap-6">
          <Link
            href="/learn"
            className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wider text-white transition-colors hover:text-green-500"
          >
            {t("learn")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}

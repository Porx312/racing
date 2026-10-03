"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0 border border-neutral-700">
      {routing.locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            className={`px-2.5 py-1.5 font-[family-name:var(--font-display)] text-sm tracking-wider ${
              active
                ? "bg-green-500 text-black"
                : "bg-transparent text-neutral-400 hover:text-white"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

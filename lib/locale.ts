import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

export function resolveLocale(locale: string): Locale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

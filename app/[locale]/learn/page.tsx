import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  countLessons,
  curriculum,
  getLessonHref,
} from "@/lib/curriculum";
import { getLessonStatusMap, lessonStatusKey } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";

type LearnPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LearnPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "learn" });
  return { title: t("title") };
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("learn");
  const tHome = await getTranslations("home");
  const tLesson = await getTranslations("lesson");
  const statusMap = await getLessonStatusMap();

  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-green-500">
        {t("breadcrumb")}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase leading-none text-white sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-neutral-400">{t("subtitle")}</p>
      <p className="mt-5 border-l-4 border-green-500 bg-neutral-950 px-4 py-3 text-sm text-neutral-300">
        {t("emptyNotice")}
      </p>

      <div className="mt-12 space-y-14">
        {curriculum.map((part, partIndex) => (
          <section key={part.slug} id={part.slug} className="scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-5xl text-green-500">
                  {String(partIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl uppercase text-white">
                  {part.title[locale]}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-neutral-400">
                  {part.summary[locale]}
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-neutral-500">
                {t("lessons", { count: countLessons(part) })}
              </p>
            </div>

            <div className="mt-6 space-y-8">
              {part.chapters.map((chapter) => (
                <div key={chapter.slug}>
                  <h3 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-neutral-500">
                    {chapter.title[locale]}
                  </h3>
                  <ol className="mt-3 divide-y divide-neutral-800 border border-neutral-800">
                    {chapter.lessons.map((lesson, lessonIndex) => {
                      const href = getLessonHref({ part, chapter, lesson });
                      const status =
                        statusMap[lessonStatusKey(part.slug, lesson.slug)] ??
                        "coming-soon";
                      return (
                        <li key={lesson.slug}>
                          <Link
                            href={href}
                            className="flex items-center justify-between gap-4 bg-black px-4 py-4 transition-colors hover:bg-neutral-950 hover:text-green-500"
                          >
                            <span className="flex min-w-0 items-baseline gap-3">
                              <span className="font-[family-name:var(--font-display)] text-lg text-green-500">
                                {String(lessonIndex + 1).padStart(2, "0")}
                              </span>
                              <span className="min-w-0">
                                <span className="block font-medium text-white">
                                  {lesson.title[locale]}
                                </span>
                                <span className="mt-1 block text-sm text-neutral-500">
                                  {lesson.summary[locale]}
                                </span>
                              </span>
                            </span>
                            <span
                              className={`shrink-0 font-[family-name:var(--font-display)] text-xs uppercase tracking-wider ${
                                status === "published"
                                  ? "text-green-500"
                                  : "text-neutral-600"
                              }`}
                            >
                              {status === "published"
                                ? tLesson("published")
                                : tHome("comingSoon")}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

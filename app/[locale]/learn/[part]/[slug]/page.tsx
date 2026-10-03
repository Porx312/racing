import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LessonNav } from "@/components/lesson/LessonNav";
import { EmptyLessonSections } from "@/components/lesson/LessonSections";
import { lessonMdxComponents } from "@/components/lesson/mdx-components";
import {
  findLesson,
  flattenLessons,
} from "@/lib/curriculum";
import { loadLessonMdx } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";

type LessonPageProps = {
  params: Promise<{ locale: string; part: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    flattenLessons().map((item) => ({
      locale,
      part: item.part.slug,
      slug: item.lesson.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { locale: rawLocale, part, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const item = findLesson(part, slug);
  if (!item) {
    return {};
  }

  return {
    title: item.lesson.title[locale],
    description: item.lesson.summary[locale],
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale: rawLocale, part, slug } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);

  const item = findLesson(part, slug);
  if (!item) {
    notFound();
  }
  const t = await getTranslations("lesson");
  const tLearn = await getTranslations("learn");
  const mdx = await loadLessonMdx(locale, part, slug);
  const isPublished = mdx?.frontmatter.status === "published";

  return (
    <article>
      <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-neutral-500">
        <Link href="/learn" className="hover:text-green-500">
          {tLearn("breadcrumb")}
        </Link>
        <span>/</span>
        <span>{item.part.title[locale]}</span>
        <span>/</span>
        <span>{item.chapter.title[locale]}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-green-500">
          {t("onTrack")}
        </p>
        <span className="font-[family-name:var(--font-display)] text-xs uppercase tracking-wider text-neutral-500">
          {isPublished ? t("published") : tLearn("comingSoon")}
        </span>
      </div>

      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl uppercase leading-none text-white sm:text-5xl">
        {item.lesson.title[locale]}
      </h1>
      <p className="mt-4 max-w-2xl text-neutral-400">
        {item.lesson.summary[locale]}
      </p>

      <div className="mt-8">
        {isPublished && mdx ? (
          <div className="space-y-3">
            <MDXRemote source={mdx.content} components={lessonMdxComponents} />
          </div>
        ) : (
          <EmptyLessonSections />
        )}
      </div>

      <LessonNav current={item} />
    </article>
  );
}

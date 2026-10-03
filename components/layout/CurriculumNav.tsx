"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { curriculum, getLessonHref } from "@/lib/curriculum";
import { Link, usePathname } from "@/i18n/navigation";
import { useProgress } from "@/hooks/useProgress";

function chapterKey(partSlug: string, chapterSlug: string): string {
  return `${partSlug}/${chapterSlug}`;
}

function matchLesson(pathname: string): {
  partSlug: string;
  chapterSlug: string;
} | null {
  for (const part of curriculum) {
    for (const chapter of part.chapters) {
      for (const lesson of chapter.lessons) {
        if (pathname === getLessonHref({ part, chapter, lesson })) {
          return { partSlug: part.slug, chapterSlug: chapter.slug };
        }
      }
    }
  }
  return null;
}

export function CurriculumNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("learn");
  const { isComplete } = useProgress();

  const [openParts, setOpenParts] = useState<Set<string>>(() => {
    const match = matchLesson(pathname);
    if (match) return new Set([match.partSlug]);
    return new Set();
  });

  const [openChapters, setOpenChapters] = useState<Set<string>>(() => {
    const match = matchLesson(pathname);
    if (match) return new Set([chapterKey(match.partSlug, match.chapterSlug)]);
    return new Set();
  });

  useEffect(() => {
    const match = matchLesson(pathname);
    if (!match) return;

    setOpenParts((current) => {
      if (current.has(match.partSlug)) return current;
      const next = new Set(current);
      next.add(match.partSlug);
      return next;
    });
    setOpenChapters((current) => {
      const key = chapterKey(match.partSlug, match.chapterSlug);
      if (current.has(key)) return current;
      const next = new Set(current);
      next.add(key);
      return next;
    });
  }, [pathname]);

  const togglePart = useCallback((slug: string) => {
    setOpenParts((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const toggleChapter = useCallback((partSlug: string, chapterSlug: string) => {
    const key = chapterKey(partSlug, chapterSlug);
    setOpenChapters((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <nav aria-label={t("toc")} className="flex flex-col gap-1">
      {curriculum.map((part, partIndex) => {
        const isPartOpen = openParts.has(part.slug);

        return (
          <div key={part.slug} className="bg-neutral-950">
            <button
              type="button"
              onClick={() => togglePart(part.slug)}
              aria-expanded={isPartOpen}
              className={`flex w-full cursor-pointer items-center gap-3 border-l-4 px-3 py-3 text-left transition-colors ${
                isPartOpen
                  ? "border-green-500 bg-neutral-900"
                  : "border-transparent hover:border-neutral-700 hover:bg-neutral-900/80"
              }`}
            >
              <span className="font-[family-name:var(--font-display)] text-2xl leading-none text-green-500">
                {String(partIndex + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 font-[family-name:var(--font-display)] text-lg uppercase tracking-wide text-white">
                {part.title[locale]}
              </span>
              <span
                aria-hidden
                className={`text-xs text-neutral-500 transition-transform ${isPartOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {isPartOpen ? (
              <div className="border-t border-neutral-800 pb-2">
                {part.chapters.map((chapter) => {
                  const key = chapterKey(part.slug, chapter.slug);
                  const isChapterOpen = openChapters.has(key);

                  return (
                    <div key={chapter.slug}>
                      <button
                        type="button"
                        onClick={() => toggleChapter(part.slug, chapter.slug)}
                        aria-expanded={isChapterOpen}
                        className="flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 hover:text-white"
                      >
                        <span>{chapter.title[locale]}</span>
                        <span
                          aria-hidden
                          className={`text-[10px] transition-transform ${isChapterOpen ? "rotate-180" : ""}`}
                        >
                          ▼
                        </span>
                      </button>

                      {isChapterOpen ? (
                        <ul className="mb-1 space-y-0.5 px-2">
                          {chapter.lessons.map((lesson) => {
                            const href = getLessonHref({
                              part,
                              chapter,
                              lesson,
                            });
                            const active = pathname === href;
                            const done = isComplete(part.slug, lesson.slug);

                            return (
                              <li key={lesson.slug}>
                                <Link
                                  href={href}
                                  className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors ${
                                    active
                                      ? "bg-green-500 text-black"
                                      : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                                  }`}
                                  aria-current={active ? "page" : undefined}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 shrink-0 ${
                                      done
                                        ? active
                                          ? "bg-black"
                                          : "bg-green-500"
                                        : active
                                          ? "bg-black/40"
                                          : "bg-neutral-600"
                                    }`}
                                  />
                                  <span className="min-w-0 flex-1 truncate">
                                    {lesson.title[locale]}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

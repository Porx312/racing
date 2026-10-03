"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  getAdjacentLessons,
  getLessonHref,
  type LessonRef,
} from "@/lib/curriculum";
import { Link } from "@/i18n/navigation";
import { useProgress } from "@/hooks/useProgress";

type LessonNavProps = {
  current: LessonRef;
};

export function LessonNav({ current }: LessonNavProps) {
  const locale = useLocale();
  const t = useTranslations("lesson");
  const { markComplete, isComplete, toggleComplete } = useProgress();

  const { previous, next } = getAdjacentLessons(
    current.part.slug,
    current.lesson.slug,
  );
  const done = isComplete(current.part.slug, current.lesson.slug);

  function handleNext() {
    markComplete(current.part.slug, current.lesson.slug);
  }

  return (
    <>
      <div className="h-24" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-800 bg-black">
        <div className="flex w-full items-stretch gap-2 px-3 py-3 sm:px-6 lg:px-8">
          {previous ? (
            <Link
              href={getLessonHref(previous)}
              className="min-w-0 flex-1 border border-neutral-700 bg-neutral-950 px-4 py-3 transition-colors hover:border-green-500"
            >
              <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-wider text-neutral-500">
                {t("prev")}
              </p>
              <p className="truncate text-sm font-medium text-white">
                {previous.lesson.title[locale]}
              </p>
            </Link>
          ) : (
            <div className="min-w-0 flex-1 border border-dashed border-neutral-800 px-4 py-3 text-sm text-neutral-600">
              {t("startOfPath")}
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              toggleComplete(current.part.slug, current.lesson.slug)
            }
            className={`shrink-0 cursor-pointer px-4 py-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-wider transition-colors ${
              done
                ? "bg-green-500 text-black"
                : "border border-neutral-700 text-neutral-300 hover:border-green-500 hover:text-green-500"
            }`}
          >
            {done ? t("completed") : t("markDone")}
          </button>

          {next ? (
            <Link
              href={getLessonHref(next)}
              onClick={handleNext}
              className="min-w-0 flex-1 bg-green-500 px-4 py-3 text-right text-black transition-colors hover:bg-green-400"
            >
              <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-wider">
                {t("next")}
              </p>
              <p className="truncate text-sm font-semibold">
                {next.lesson.title[locale]}
              </p>
            </Link>
          ) : (
            <div className="min-w-0 flex-1 border border-dashed border-neutral-800 px-4 py-3 text-right text-sm text-neutral-600">
              {t("endOfPath")}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

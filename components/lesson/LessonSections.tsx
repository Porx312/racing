"use client";

import { useTranslations } from "next-intl";
import type { LessonSectionId } from "@/lib/mdx";

const sectionMeta: Record<
  LessonSectionId,
  {
    index: string;
    titleKey:
      | "sectionWhat"
      | "sectionWhy"
      | "sectionExample"
      | "sectionExercise";
    hintKey:
      | "sectionWhatHint"
      | "sectionWhyHint"
      | "sectionExampleHint"
      | "sectionExerciseHint";
  }
> = {
  what: {
    index: "01",
    titleKey: "sectionWhat",
    hintKey: "sectionWhatHint",
  },
  why: {
    index: "02",
    titleKey: "sectionWhy",
    hintKey: "sectionWhyHint",
  },
  example: {
    index: "03",
    titleKey: "sectionExample",
    hintKey: "sectionExampleHint",
  },
  exercise: {
    index: "04",
    titleKey: "sectionExercise",
    hintKey: "sectionExerciseHint",
  },
};

type LessonSectionProps = {
  id: LessonSectionId;
  children?: React.ReactNode;
};

/** Legacy boxed section — used by older Module I MDX tags. */
export function LessonSection({ id, children }: LessonSectionProps) {
  const t = useTranslations("lesson");
  const meta = sectionMeta[id];

  return (
    <section
      id={id}
      className="scroll-mt-24 border border-neutral-800 bg-neutral-950"
    >
      <header className="flex items-center gap-4 border-b border-neutral-800 px-5 py-3">
        <span className="font-[family-name:var(--font-display)] text-2xl text-green-500">
          {meta.index}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-white">
          {t(meta.titleKey)}
        </h2>
      </header>
      <div className="px-5 py-5 text-base leading-7 text-neutral-300">
        {children ?? (
          <p className="text-sm leading-7 text-neutral-500">{t(meta.hintKey)}</p>
        )}
      </div>
    </section>
  );
}

export function EmptyLessonSections() {
  const t = useTranslations("lesson");

  return (
    <div className="max-w-3xl border-l-4 border-green-500 bg-neutral-950 px-5 py-6">
      <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-green-500">
        {t("comingSoonTitle")}
      </p>
      <p className="mt-3 text-base leading-7 text-neutral-400">
        {t("comingSoonBody")}
      </p>
      <p className="mt-4 text-sm text-neutral-600">{t("articleComingSoonHint")}</p>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

export function ExerciseCallout({ children }: { children?: ReactNode }) {
  const t = useTranslations("lesson");

  return (
    <aside className="mt-10 border border-green-500/40 bg-neutral-950">
      <header className="flex items-center gap-3 border-b border-green-500/30 px-5 py-3">
        <span className="font-[family-name:var(--font-display)] text-2xl text-green-500">
          01
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide text-white">
          {t("sectionExercise")}
        </h3>
      </header>
      <div className="space-y-3 px-5 py-5 text-base leading-7 text-neutral-300 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mt-0 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </aside>
  );
}

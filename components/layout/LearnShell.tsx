"use client";

import { useState } from "react";
import { CurriculumNav } from "./CurriculumNav";

type LearnShellProps = {
  tocLabel: string;
  openLabel: string;
  closeLabel: string;
  children: React.ReactNode;
};

export function LearnShell({
  tocLabel,
  openLabel,
  closeLabel,
  children,
}: LearnShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-80 shrink-0 border-r border-neutral-800 bg-black lg:block">
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-green-500">
            {tocLabel}
          </p>
          <CurriculumNav />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="border-b border-neutral-800 p-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 bg-green-500 px-4 py-2 font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-black"
          >
            {openLabel}
          </button>
        </div>

        {drawerOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 cursor-pointer bg-black/80"
              aria-label={closeLabel}
              onClick={() => setDrawerOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 flex w-[min(20rem,90vw)] flex-col bg-black shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-4">
                <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-green-500">
                  {tocLabel}
                </p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="cursor-pointer text-sm uppercase tracking-wider text-neutral-400 hover:text-white"
                >
                  {closeLabel}
                </button>
              </div>
              <div
                className="overflow-y-auto p-4"
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a")) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <CurriculumNav />
              </div>
            </div>
          </div>
        ) : null}

        <div className="px-4 py-8 sm:px-6 lg:px-10">{children}</div>
      </div>
    </div>
  );
}

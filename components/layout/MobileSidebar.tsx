"use client";

import { useState } from "react";

type MobileSidebarProps = {
  label: string;
  closeLabel: string;
  children: React.ReactNode;
};

export function MobileSidebar({
  label,
  closeLabel,
  children,
}: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-2 font-mono text-[11px] tracking-[0.16em] text-neutral-200 lg:hidden"
      >
        <span aria-hidden className="block h-2 w-2 bg-green-500" />
        {label}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-white/10 bg-[#141414] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-4">
              <p className="font-mono text-[11px] tracking-[0.2em] text-green-500/80">
                {label}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-neutral-400 hover:text-neutral-100"
              >
                {closeLabel}
              </button>
            </div>
            <div
              className="overflow-y-auto px-4 py-5"
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("a")) {
                  setOpen(false);
                }
              }}
            >
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

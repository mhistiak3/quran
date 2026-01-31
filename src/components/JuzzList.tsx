"use client";

import { JUZ_DATA } from "@/data/quran-data";
import Link from "next/link";

export const JuzzList = () => {
  return (
    <div className="px-4 pb-28 pt-2">
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
        {JUZ_DATA.map((juz) => (
          <Link
            key={juz.id}
            href={`/read/${juz.startPage}`}
            className="flex flex-col items-center justify-center rounded-app-lg p-5 bg-[var(--surface-elevated)] border border-neutral-200/80 active:scale-[0.98] transition-all hover:border-primary-200 hover:bg-primary-50/50"
          >
            <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-widest mb-1">
              Juz
            </span>
            <span className="text-2xl font-bold text-[var(--foreground)] tabular-nums">
              {juz.id}
            </span>
            <span className="text-[11px] text-neutral-500 mt-1.5">
              Page {juz.startPage}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

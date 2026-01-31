"use client";

import { SURAH_DATA } from "@/data/quran-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const SurahList = () => {
  return (
    <div className="px-4 pb-28 pt-2">
      <ul className="space-y-1">
        {SURAH_DATA.map((surah) => (
          <li key={surah.id}>
            <Link
              href={`/read/${surah.startPage}`}
              className="flex items-center gap-4 rounded-app-lg px-4 py-3.5 active:scale-[0.99] transition-transform bg-[var(--surface-elevated)] hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 tabular-nums">
                {surah.id}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--foreground)] truncate">
                  {surah.name}
                </p>
                <p className="text-xs text-neutral-500 truncate mt-0.5">
                  {surah.transliteration}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs font-medium text-neutral-500">
                  p.{surah.startPage}
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-300" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

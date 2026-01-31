"use client";

import { JuzzList } from "@/components/JuzzList";
import { MobileContainer } from "@/components/MobileContainer";
import { Navigation } from "@/components/Navigation";
import { SurahList } from "@/components/SurahList";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "juzz" ? "juzz" : "surah";
  const [activeTab, setActiveTab] = useState<"surah" | "juzz">(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "juzz") setActiveTab("juzz");
    else setActiveTab("surah");
  }, [searchParams]);

  return (
    <>
      <header className="shrink-0 pt-6 pb-4 px-5 bg-[var(--surface)] z-10">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {siteConfig.shortName}
          </h1>
          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
            114 Surahs
          </span>
        </div>

        <div className="flex p-1 rounded-app-lg bg-neutral-100">
          <button
            onClick={() => setActiveTab("surah")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              activeTab === "surah"
                ? "bg-white text-[var(--foreground)]"
                : "text-neutral-500",
            )}
          >
            Surahs
          </button>
          <button
            onClick={() => setActiveTab("juzz")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              activeTab === "juzz"
                ? "bg-white text-[var(--foreground)]"
                : "text-neutral-500",
            )}
          >
            Juzz
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar overscroll-behavior-contain">
        {activeTab === "surah" ? <SurahList /> : <JuzzList />}
      </main>

      <Navigation />
    </>
  );
}

export default function Home() {
  return (
    <MobileContainer>
      <Suspense
        fallback={
          <div className="flex items-center justify-center flex-1 text-neutral-400 font-medium text-sm">
            Loading...
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </MobileContainer>
  );
}

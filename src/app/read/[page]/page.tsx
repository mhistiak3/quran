"use client";

import { MobileContainer } from "@/components/MobileContainer";
import { JUZ_DATA, SURAH_DATA, TOTAL_PAGES } from "@/data/quran-data";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 60;

export default function ReaderPage() {
  const params = useParams();
  const router = useRouter();
  const pageParam = Number(params.page);

  const initialPage =
    isNaN(pageParam) || pageParam < 1
      ? 1
      : pageParam > TOTAL_PAGES
        ? TOTAL_PAGES
        : pageParam;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const mouseStart = useRef<{ x: number; y: number } | null>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(initialPage);
    setLoading(true);
  }, [initialPage]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) router.push(`/read/${currentPage - 1}`);
  }, [currentPage, router]);

  const handleNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES) router.push(`/read/${currentPage + 1}`);
  }, [currentPage, router]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        if (dx > 0) handlePrev();
        else handleNext();
      }
      touchStart.current = null;
    },
    [handlePrev, handleNext],
  );

  useEffect(() => {
    const el = swipeAreaRef.current;
    if (!el) return;
    const preventClickAfterSwipe = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const end = e.changedTouches[0];
      const dx = end.clientX - touchStart.current.x;
      if (Math.abs(dx) >= SWIPE_THRESHOLD) e.preventDefault();
    };
    el.addEventListener("touchend", preventClickAfterSwipe, { passive: false });
    return () => el.removeEventListener("touchend", preventClickAfterSwipe);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!mouseStart.current) return;
      const dx = e.clientX - mouseStart.current.x;
      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        e.preventDefault();
        if (dx > 0) handlePrev();
        else handleNext();
      }
      mouseStart.current = null;
    },
    [handlePrev, handleNext],
  );

  const currentSurah = SURAH_DATA.slice()
    .reverse()
    .find((s) => s.startPage <= currentPage);
  const currentJuz = JUZ_DATA.slice()
    .reverse()
    .find((j) => j.startPage <= currentPage);

  return (
    <MobileContainer className="bg-[#f8f6f2] min-h-dvh overflow-hidden flex flex-col">
      {/* Top bar: back only, under phone screen, always visible */}
      <header className="shrink-0 flex items-center px-4 h-12 border-b border-neutral-200/80 bg-[var(--surface)]">
        <Link
          href="/"
          className="h-9 w-9 flex items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100 active:scale-95 transition-transform"
          aria-label="Back to list"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="ml-3 text-sm font-medium text-neutral-500 truncate">
          {currentSurah ? currentSurah.name : "Quran"} · p.{currentPage}
        </span>
      </header>

      {/* Swipe/tap area */}
      <div
        ref={swipeAreaRef}
        className="relative flex-1 min-h-0 flex items-center justify-center bg-[#fdfcf9] touch-none select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* RTL: left = next page, right = prev page */}
        <div className="absolute inset-0 flex z-0">
          <div className="w-1/3 h-full cursor-pointer" onClick={handleNext} aria-label="Next page" />
          <div className="w-1/3 h-full cursor-pointer" />
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} aria-label="Previous page" />
        </div>

        <div className="relative w-full h-full max-w-[600px] flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0">
              <div className="h-10 w-10 rounded-full border-2 border-primary-200 border-t-primary-600 animate-spin" />
              <span className="text-xs font-medium text-primary-600">
                Loading page {currentPage}
              </span>
            </div>
          )}
          <div
            className={cn(
              "relative w-full h-full transition-opacity duration-300",
              loading ? "opacity-0" : "opacity-100",
            )}
          >
            <Image
              src={`https://download.quranmazid.com/mushaf/hafezi/quran_${currentPage}.png`}
              alt={`Quran page ${currentPage}`}
              fill
              className="object-contain"
              priority
              onLoad={() => setLoading(false)}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar: RTL — next (left), prev (right) */}
      <footer className="shrink-0 flex items-center justify-between px-4 h-14 border-t border-neutral-200/80 bg-[var(--surface)] pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= TOTAL_PAGES}
          className="h-10 w-10 flex items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100 active:scale-95 transition-transform disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Next page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-xs text-neutral-400">
          Page {currentPage} · Juz {currentJuz ? currentJuz.id : "—"}
        </span>
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className="h-10 w-10 flex items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100 active:scale-95 transition-transform disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Previous page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </footer>
    </MobileContainer>
  );
}

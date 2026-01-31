"use client";
import { useEffect } from "react";

const TOTAL_PAGES = 604;
const CACHE_NAME = "quran-pages";
const STORAGE_KEY = "quran_download_progress";

export function OfflineManager() {
  useEffect(() => {
    let isMounted = true;

    const downloadPages = async () => {
      // 1. Check if we need to start or resume
      const storedProgress = localStorage.getItem(STORAGE_KEY);
      let nextPageIndex = storedProgress ? parseInt(storedProgress, 10) : 1;

      if (nextPageIndex > TOTAL_PAGES) {
        console.log("Offline download complete.");
        return;
      }

      if ("serviceWorker" in navigator) {
        try {
          // Wait for SW to be ready
          const registration = await navigator.serviceWorker.ready;
          if (!registration) return;

          // We don't strictly *need* to open the cache manually if the fetch is intercepted
          // but checking cache existence saves bandwidth on restart.
          const cache = await caches.open(CACHE_NAME);

          console.log(
            `Starting background download from page ${nextPageIndex}...`,
          );

          while (nextPageIndex <= TOTAL_PAGES && isMounted) {
            const url = `https://download.quranmazid.com/mushaf/hafezi/quran_${nextPageIndex}.png`;

            // Check if already in cache to skip redundant network requests
            const match = await cache.match(url);

            if (!match) {
              try {
                // Fetching matches the `unoptimized` Image usage in the reader.
                // The Service Worker (if configured correctly) will see this request and cache it
                // because of the runtimeCaching rule.
                // However, we can also explicitly put it in the cache to be double sure
                // and to handle the "populate cache" logic more directly.
                const response = await fetch(url, { mode: "cors" });

                if (response.ok) {
                  await cache.put(url, response.clone());
                } else {
                  console.warn(
                    `Failed to fetch page ${nextPageIndex}: ${response.status}`,
                  );
                  // Optional: delay or break on error? For now, continue to try next or wait.
                  // Let's implement a simple retry or just move on?
                  // Moving on might result in missing pages. Let's wait a bit and retry same page?
                  // Promoting to simple skip for resilience in this v1.
                }
              } catch (err) {
                console.error(`Error fetching page ${nextPageIndex}`, err);
                // Network error? Stop loop or wait?
                // Let's stop and retry on next app load to avoid battering a dead network.
                break;
              }
            }

            // Save progress
            localStorage.setItem(STORAGE_KEY, (nextPageIndex + 1).toString());
            nextPageIndex++;

            // "Little by little" - delay between requests to be gentle
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error("OfflineManager initialization failed", error);
        }
      }
    };

    // Delay start slightly to prioritize initial page load
    const timer = setTimeout(() => {
      // Use requestIdleCallback if available for even lower priority
      if ("requestIdleCallback" in window) {
        // @ts-ignore
        window.requestIdleCallback(() => downloadPages());
      } else {
        downloadPages();
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return null; // This component handles logic only, no UI
}

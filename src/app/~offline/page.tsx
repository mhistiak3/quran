import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-[var(--background)] text-[var(--foreground)]">
      <p className="text-neutral-500 text-sm mb-2">You are offline</p>
      <p className="text-center text-neutral-400 text-sm mb-6 max-w-[260px]">
        Connect to the internet to load new pages. Previously opened Quran pages
        will still work.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium"
      >
        Back to Quran
      </Link>
    </div>
  );
}

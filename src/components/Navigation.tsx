"use client";

import { cn } from "@/lib/utils";
import { BookOpen, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Surahs", icon: BookOpen, href: "/?tab=surah" },
    { label: "Juzz", icon: LayoutGrid, href: "/?tab=juzz" },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (pathname !== "/") return false;
    const tab = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("tab") : null;
    if (item.href.includes("tab=surah") && (tab === null || tab === "surah")) return true;
    if (item.href.includes("tab=juzz") && tab === "juzz") return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-[var(--surface)]/95 backdrop-blur-xl border-t border-neutral-200/80 pb-[env(safe-area-inset-bottom)] pt-1.5">
      <div className="flex justify-around items-center h-11 px-4">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg transition-colors min-w-0",
                active ? "text-primary-600" : "text-neutral-500",
              )}
            >
              <item.icon
                className={cn("h-5 w-5 shrink-0", active && "stroke-[2.5]")}
              />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

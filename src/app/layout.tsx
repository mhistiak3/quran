import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontApp = Plus_Jakarta_Sans({
  variable: "--font-app",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Al Quran Hafezi",
  description: "Read Hafezi Quran 15 lines",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al Quran",
  },
};

export const viewport: Viewport = {
  themeColor: "#15803d", // quran-green-700
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent zoom for app-like feel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontApp.variable} style={{ colorScheme: "light" }}>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen">
        {children}
      </body>
    </html>
  );
}

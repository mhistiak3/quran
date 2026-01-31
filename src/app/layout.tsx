import { OfflineManager } from "@/components/OfflineManager";
import { siteConfig } from "@/config";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontApp = Plus_Jakarta_Sans({
  variable: "--font-app",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ogImage = siteConfig.ogImage ?? siteConfig.logo;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  manifest: "/manifest.webmanifest",
  applicationName: siteConfig.shortName,
  ...(siteConfig.keywords?.length && { keywords: siteConfig.keywords }),
  ...(siteConfig.author && { authors: [{ name: siteConfig.author }] }),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.appleWebAppTitle,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    ...(ogImage && { images: [{ url: ogImage, alt: siteConfig.name }] }),
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={fontApp.variable}
      style={{ colorScheme: "light" }}
    >
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen">
        <OfflineManager />
        {children}
      </body>
    </html>
  );
}

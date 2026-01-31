import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  extendDefaultRuntimeCaching: true,
  fallbacks: {
    document: "/~offline",
  },
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/download\.quranmazid\.com\/mushaf\/hafezi\/quran_\d+\.png$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "quran-pages",
          expiration: {
            maxEntries: 650,
            maxAgeSeconds: 31536000, // 1 year
          },
        },
      },
      {
        urlPattern: /\/_next\/image\?url=.*quranmazid\.com.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "quran-pages-next-image",
          expiration: {
            maxEntries: 650,
            maxAgeSeconds: 31536000,
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "download.quranmazid.com",
      },
    ],
  },
};

export default withPWA(nextConfig);

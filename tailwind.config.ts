import type { Config } from "tailwindcss";

const quranGreen = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d",
  950: "#052e16",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: quranGreen,
        "quran-green": quranGreen,
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
      },
      fontFamily: {
        sans: ["var(--font-app)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "app": "1rem",
        "app-lg": "1.25rem",
        "app-xl": "1.5rem",
      },
      boxShadow: {
        "app": "0 2px 8px rgba(0,0,0,0.06)",
        "app-lg": "0 4px 20px rgba(0,0,0,0.08)",
        "app-inner": "inset 0 1px 0 0 rgba(255,255,255,0.5)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
export default config;

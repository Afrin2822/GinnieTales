import type { Config } from "tailwindcss";

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
        "brand-purple": "#6B46C1",
        "brand-coral": "#F56565",
        "brand-rose": "#ED64A6",
        "brand-cream": "#FFFBF0",
        "brand-dark": "#1A1A2E",
      },
      fontFamily: {
        heading: ["var(--font-nunito)", "system-ui", "sans-serif"],
        body: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        sparkle: {
          "0%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 4px rgba(237, 100, 166, 0.6))",
          },
          "33%": {
            opacity: "0.85",
            transform: "translateY(-2px) rotate(-2deg)",
            filter: "drop-shadow(0 0 8px rgba(107, 70, 193, 0.5))",
          },
          "66%": {
            opacity: "0.95",
            transform: "translateY(2px) rotate(2deg)",
            filter: "drop-shadow(0 0 6px rgba(245, 101, 101, 0.45))",
          },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        sparkle: "sparkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

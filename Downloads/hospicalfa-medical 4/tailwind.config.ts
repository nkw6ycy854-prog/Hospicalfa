import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B3A73",
          dark:    "#0F2252",
          mid:     "#223F85",
          light:   "#EEF3FB",
        },
        teal: {
          DEFAULT: "#0D99CC",
          dark:    "#0A7BA3",
          light:   "#E0F4FC",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.3s ease forwards",
        "fade-up":  "fadeUp 0.4s ease forwards",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to:   { transform: "translateX(0)",    opacity: "1" },
        },
        fadeUp: {
          from: { transform: "translateY(16px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

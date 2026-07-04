import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#818cf8",      // indigo-400
          "secondary": "#a855f7",    // purple-500
          "accent": "#14b8a6",       // teal-500
          "neutral": "#0f172a",      // slate-900
          "base-100": "#030712",     // gray-950
          "base-200": "#0b0f19",     // gray-900 slate
          "base-300": "#111827",     // gray-900
          "base-content": "#f3f4f6", // gray-100
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        light: {
          "primary": "#4f46e5",      // indigo-600
          "secondary": "#9333ea",    // purple-600
          "accent": "#0d9488",       // teal-600
          "neutral": "#e5e7eb",      // gray-200
          "base-100": "#ffffff",     // white
          "base-200": "#f9fafb",     // gray-50
          "base-300": "#f3f4f6",     // gray-100
          "base-content": "#1f2937", // gray-800
          "info": "#0284c7",
          "success": "#059669",
          "warning": "#d97706",
          "error": "#dc2626",
        },
      },
    ],
  },
};

export default config;

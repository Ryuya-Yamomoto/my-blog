import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans-jp": ["var(--font-noto-sans-jp)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

module.exports = {
  darkMode: "selector",
};

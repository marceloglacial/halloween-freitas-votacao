import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import animations from "@midudev/tailwind-animations";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui, animations],
  daisyui: {
    themes: ["halloween"],
  },
};
export default config;

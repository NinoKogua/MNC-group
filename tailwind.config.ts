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
        "green-primary": "#006341",
        "brown-primary": "#6b4f2a",
        "beige-primary": "#d1c09b",
        "black-primary": "#000000",
        "white-primary": "#ffffff",
      },
      fontFamily: {
        kirovi: ["kirovi-bold", "sans-serif"],
        mtavruli: ["mtavruli-regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

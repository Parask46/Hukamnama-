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
        gold:       "#C9933A",
        "deep-blue":"#0D1B2A",
        cream:      "#F5EDD6",
        accent:     "#E8B55A",
        "text-muted":"#8A7A5A",
      },
      fontFamily: {
        gurmukhi: ['"Noto Serif Gurmukhi"', "serif"],
        english:  ['"EB Garamond"', "Georgia", "serif"],
        ui:       ["Cinzel", '"Times New Roman"', "serif"],
      },
    },
  },
  plugins: [],
};
export default config;


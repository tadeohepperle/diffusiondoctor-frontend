/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  important: true,
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        xs: "0.5rem",
      },
      colors: {
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
        "2/1": "2 / 1",
        "3/1": "3 / 1",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};

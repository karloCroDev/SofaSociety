import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {},
      colors: {
        red: {
          900: "#BD3207",
          400: "#DF4718",
        },
        yellow: {
          400: "#FFEFB7",
        },
        gray: {
          900: "#050505", // Figma-black
          800: "#1F1F20",
          700: "#3A3A3B",
          600: "#545457",
          500: "#808080",
          400: "#A3A3A3",
          300: "#BBBBBB",
          200: "#D1D1D1",
          100: "#E7E7E7",
          50: "#F4F4F4",
          30: "#F8F8F9",
          20: "#FBFBFB",
          10: "#FDFDFD", // Figma-white
        },
        fontSize: {
          "4xl": "56px",
          "3xl": "48px",
          "2xl": "40px",
          xl: "32px",
          lg: "24px",
          md: "20px",
          base: "16px",
          sm: "12px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

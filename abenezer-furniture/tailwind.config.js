/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: "#fbf6ee",
          100: "#f3e6d0",
          200: "#e6c89e",
          300: "#d6a665",
          400: "#c4863e",
          500: "#a9682c",
          600: "#8a5224",
          700: "#6e4120",
          800: "#5a361f",
          900: "#4b2e1d",
        },
      },
      fontFamily: {
        serif: ["Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};

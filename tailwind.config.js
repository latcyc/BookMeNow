/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans"],
      },
      colors: {
        success: "#34CAA5",
        error: "#ED544E",
        header: "#26282C",
        grey100: "#E5EAEF",
        grey200: "#DADDDD",
        grey300: "#787486",
        grey400: "#F7F8FA",
        grey500: "#EBECF2",
        grey600: "#1F1E25",
        grey700: "#B2ABAB",
        grey800: "#EDF2F7",
        grey900: "#B2B3B9",
        dark100: "#0C0B10",
        dark200: "#151419",
        dark300: "#0D062D",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
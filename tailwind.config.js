/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange": "#FF6B35",
        "blue": "#43A4C6",
        "beige": "#F9F0E6",
        "searchbar-gray": "#EBF1F3"
      },
      fontFamily: {
        "alata-regular": ["Alata-Regular", "sans-serif"],
        "inter-bold": ["Inter-Bold", "sans-serif"],
        "inter-medium": ["Inter-Medium", "sans-serif"],
        "inter-regular": ["Inter-Regular", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
      }
    },
  },
  plugins: [],
}

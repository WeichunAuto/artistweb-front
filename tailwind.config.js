// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        georgian: ['Georgian'],
      },
      wordSpacing: {
        'wider': '0.25rem',   // wider space between words
        'widest': '0.5rem',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    function ({ addUtilities }) {
      addUtilities({
        '.word-spacing-wider': {
          'word-spacing': '0.25rem',
        },
        '.word-spacing-widest': {
          'word-spacing': '0.5rem',
        },
      });
    }],
}

 
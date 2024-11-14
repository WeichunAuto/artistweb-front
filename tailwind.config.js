// @ts-nocheck
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}", // do not add empty space between file types
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      borderColor: {
        'red-custom': '#ff0000', // Replace this with your desired shade of red
      },
      borderWidth: {
        '3': '3px', // Optional: if you want a specific width 
      },
      fontFamily: {
        georgian: ['Georgian'],
      },
      wordSpacing: {
        'wider': '0.25rem',   // wider space between words
        'widest': '0.5rem',
      },
      opacity: {
        '96': '0.96',
        '97': '0.97',
        '98': '0.98',
        '99': '0.99'
      }
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

 
/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        primary: "#0F4D81",
        maroon: "#9B1B2F",
        dark: "#2B292A",
        lightblue: "#A2D5EB",
        offwhite: "#F7F6F2",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        playfair: ["var(--font-playfair)"],
        century: ["var(--font-century)"],
      },
    },
  },
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
};

module.exports = config;
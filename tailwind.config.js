/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/native")

module.exports = {
  content: ["./app/**/*.{js}", "./index.js"],
  theme: {
    extend: {},
  },
  plugins: [nativewind()],
}
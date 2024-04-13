/** @type {import('tailwindcss').Config} */
const colors = require('./src/theme/data/colors.json');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

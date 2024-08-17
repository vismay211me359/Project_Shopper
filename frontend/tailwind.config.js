/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gold': 'rgba(205, 158, 83, 1)',
        'custom-goldhover':'rgba(225, 188, 113, 1)',
      },
      fontFamily: {
        'compadre': ['Compadre', 'serif'],
      },
    },
  },
  plugins: [],
}


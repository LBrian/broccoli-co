/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Target mobile landscape viewport
        'short': { 'raw': '(max-height: 414px)' }
      }
    },
  },
  plugins: [require("daisyui")]
}

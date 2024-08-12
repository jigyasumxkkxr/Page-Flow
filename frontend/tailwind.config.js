/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '1px',
      },
      padding: {
        '60px': '60px',
      }
    },
  },
  plugins: [],
}


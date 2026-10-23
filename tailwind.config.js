/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        etec: {
          red: '#b91c1c',
          redHover: '#991b1b',
          dark: '#1e293b',
          lightBg: '#f8fafc',
          border: '#e2e8f0'
        }
      }
    },
  },
  plugins: [],
}

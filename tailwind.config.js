/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "rgb(var(--theme-color) / <alpha-value>)",
        background: "var(--bg-color)",
        card: "var(--card-bg)",
        text: "var(--text-color)",
      },
      backdropBlur: {
        glass: "10px",
      }
    },
  },
  plugins: [],
}

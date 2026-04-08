/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#aa3bff',
        secondary: '#f4f3ec',
        dark: '#08060d',
        light: '#fff',
        border: '#e5e4e7',
        text: '#6b6375',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors:{
        nch:{
            50: '#e6f0f0',
            100: '#b3cccc',
            200: '#80b3b3',
            300: '#4d9999',
            400: '#267f7f',
            500: '#618989',
            600: '#4d6d6d',
            700: '#3a5151',
            800: '#263737',
            900: '#131a1a',
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbeefe',
          500: '#3895f3',
          600: '#2276e3',
          700: '#1a5fc6',
          800: '#1a4ea3',
        },
      },
    },
  },
  plugins: [],
};
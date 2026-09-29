/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#EC4899',
        accent: '#8B5CF6',
        dark: '#1E293B',
        light: '#F8FAFC',
      }
    },
  },
  plugins: [],
}

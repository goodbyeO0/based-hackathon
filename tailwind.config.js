/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        secondary: '#9333EA', // Purple
        accent: '#FBBF24', // Amber
        background: '#F9FAFB', // Light Gray
        text: '#1F2937', // Dark Gray
      },
    },
  },
  plugins: [],
};
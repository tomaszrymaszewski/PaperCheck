/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#0073f5',
        'blue-dark': '#005cc4',
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
        'dark-border': '#2d2d2d',
      },
    },
  },
  plugins: [],
};

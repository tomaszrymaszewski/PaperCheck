/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#121212',
          darker: '#0a0a0a',
        },
        foreground: {
          DEFAULT: '#FFFFFF',
          muted: '#9ca3af',
        },
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          hover: '#2563eb', // blue-600
          light: 'rgba(59, 130, 246, 0.1)', // blue-500 at 10% opacity
        },
        secondary: {
          DEFAULT: '#2c3542',
          hover: '#3c4552',
        },
        success: {
          DEFAULT: '#10b981', // green-500
          light: 'rgba(16, 185, 129, 0.1)', // green-500 at 10% opacity
        },
        warning: {
          DEFAULT: '#f59e0b', // yellow-500
          light: 'rgba(245, 158, 11, 0.1)', // yellow-500 at 10% opacity
        },
        error: {
          DEFAULT: '#ef4444', // red-500
          light: 'rgba(239, 68, 68, 0.1)', // red-500 at 10% opacity
        },
      },
      borderRadius: {
        DEFAULT: '0.375rem',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#121212',
          secondary: '#1a1a1a',
          accent: '#2a2a2a',
          border: '#333333',
        },
        accent: {
          primary: '#3700B3',
          secondary: '#03DAC6',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        'gradient-size': '200% 200%',
      },
      backdropBlur: {
        'md': '10px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 
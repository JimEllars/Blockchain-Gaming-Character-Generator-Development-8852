/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': {
          light: '#4A7862',
          DEFAULT: '#2F5241',
          dark: '#1F3A2D',
        },
        'lavender': {
          light: '#E6E6FA',
          DEFAULT: '#9370DB',
          dark: '#7B68EE',
        },
        'pastel': {
          white: '#FDFEFF',
          pink: '#FFE5EC',
          blue: '#E8F4FF',
          yellow: '#FFF9E6',
          green: '#E8F6EF',
          purple: '#F3E6FF',
        },
        'cloud': {
          light: '#FFFFFF',
          DEFAULT: '#F8F9FE',
          dark: '#EEF1F8',
        },
      },
      fontFamily: {
        'fluffy': ['Quicksand', 'Comic Sans MS', 'cursive', 'sans-serif'],
        'cute': ['Exo 2', 'Comic Sans MS', 'cursive', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cloud-drift': 'cloud-drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'cloud-drift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'pastel': '0 4px 15px rgba(147, 112, 219, 0.2)',
        'cloud': '0 8px 30px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'cloud': '30px',
      },
    },
  },
  plugins: [],
}
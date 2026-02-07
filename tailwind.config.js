/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Lao"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Noto Serif Lao"', '"Noto Sans Lao"', 'system-ui', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#22d3ee',
          soft: '#67e8f9'
        },
        surface: {
          900: '#0b0f12',
          800: '#11161c',
          700: '#171e26'
        }
      },
      boxShadow: {
        glow: '0 0 35px rgba(34, 211, 238, 0.2)'
      }
    }
  },
  plugins: []
};

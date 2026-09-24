/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        eco: {
          primary: '#a9db2c',
          secondary: '#bfe447',
          light: '#d4ed62',
          pale: '#eaf67c',
          warn: '#ffff97',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 10px 0 rgba(20, 40, 10, 0.06)',
        cardHover: '0 8px 24px 0 rgba(20, 40, 10, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

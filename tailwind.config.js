/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5200',
        secondary: '#FFB347',
        bg: '#FFFAF5',
        card: '#FFF0E6',
        dark: '#1A1A1A',
        muted: '#8A7E77',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        displayAlt: ['Syne', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'soft-card': '0 18px 45px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}


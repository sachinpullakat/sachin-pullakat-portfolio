/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0F1013',
          900: '#15171B',
          800: '#1C1F24',
          700: '#262A31',
          600: '#343941',
          400: '#6B7280',
          200: '#C9CCD1',
          50: '#F3F4F1',
        },
        signal: {
          DEFAULT: '#5B8DEF',
          dim: '#3E5FA3',
          bright: '#8AB0FF',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx,md}',
    './config/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Palette rebuild (2026-10-15): switched from emerald green to a
         * violet / near-black ink system to match the enterprise look the
         * site owner wants to adopt. `brand` holds the ink + mid-violet
         * ladder, `accent` holds the bright-violet highlight, `surface`
         * keeps white + a very light lavender tint for background washes.
         * Dark mode uses the near-black `brand-950`.
         */
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#0a0a1f',
          950: '#050510',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f5f3ff',
          dark: '#0a0a1f',
          darker: '#050510',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
        screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px' },
      },
      typography: {
        DEFAULT: { css: { maxWidth: '75ch' } },
      },
    },
  },
  plugins: [],
};

export default config;

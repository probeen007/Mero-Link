/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
        'accent-text': token('accent-text'),
        lime: token('lime'),
        sky: token('sky'),
        butter: token('butter'),
        pink: token('pink'),
        // Sticker tiles always carry dark text, in both modes.
        'on-sticker': '#111014',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'var(--font-geist)', 'ui-sans-serif', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '1.5rem',
        field: '0.75rem',
      },
      boxShadow: {
        sticker: '4px 4px 0 0 rgb(var(--ink))',
        'sticker-sm': '2px 2px 0 0 rgb(var(--ink))',
        lift: '0 1px 2px rgb(var(--ink) / 0.06), 0 12px 32px -12px rgb(var(--ink) / 0.18)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up .6s cubic-bezier(.16,1,.3,1) both',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
    // Explicit theme/variant classes
    "theme-default", "theme-aurora", "theme-neon", "theme-light", "theme-starfield",
    "btn-default", "btn-aurora", "btn-neon", "btn-light", "btn-starfield",
    "card-default", "card-aurora", "card-neon", "card-light", "card-starfield",
    "img-default", "img-aurora", "img-neon", "img-light", "img-starfield",
    // Animations used in marketing pages
    "animate-fadeIn", "animate-fadeInDelay", "animate-fadeInDelay2",
    // Generic pattern to keep dynamic classes
    { pattern: /(bg|from|via|to|text|ring|animate|shadow|border|w|h|rounded|top|left|right|bottom)-.*/ },
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-neon": "repeating-linear-gradient(45deg, rgba(0,255,255,0.1) 0 1px, transparent 1px 20px)",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "left center" },
          "50%": { "background-size": "200% 200%", "background-position": "right center" },
        },
        "gradient-y": {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "center top" },
          "50%": { "background-size": "200% 200%", "background-position": "center bottom" },
        },
        "gradient-xy": {
          "0%, 100%": { "background-size": "400% 400%", "background-position": "left top" },
          "50%": { "background-size": "400% 400%", "background-position": "right bottom" },
        },
        "gridMove": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "wave": {
          "0%": { backgroundPosition: "0 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "gridMove": "gridMove 15s linear infinite",
        "wave": "wave 20s linear infinite",
        fadeIn: 'fadeIn 600ms ease-out both',
        fadeInDelay: 'fadeIn 900ms ease-out both',
        fadeInDelay2: 'fadeIn 1200ms ease-out both',
      },
      boxShadow: {
        neon: "0 0 8px #ff00ff, 0 0 16px #ff00ff",
        "neon-lg": "0 0 12px #ff00ff, 0 0 24px #ff00ff",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};

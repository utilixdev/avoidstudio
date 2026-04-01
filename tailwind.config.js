/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        void: '#04040A',
        panel: '#080810',
        acid: '#B8FF2E',
        plasma: '#6C63FF',
        ghost: 'rgba(255,255,255,0.04)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 3s linear infinite',
        'glitch': 'glitch 0.5s steps(2) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%': { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-2px, 0)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)', transform: 'translate(2px, 0)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)', transform: 'translate(0, 0)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(-2px, 0)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)', transform: 'translate(2px, 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)', transform: 'translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
}

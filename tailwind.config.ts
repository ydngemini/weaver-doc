import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        'neon-cyan': '#00f2ff',
        'electric-magenta': '#bc13fe',
        'terminal-dark': '#16161d',
        'deep-navy': '#0a0a1a',
        'panel-bg': '#0d0d14',
        'border-dim': '#1a1a2e',
      },
      fontFamily: {
        mono: ['"Space Mono"', '"Fira Code"', '"Courier New"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
      },
      boxShadow: {
        'cyan-glow': '0 0 10px #00f2ff, 0 0 30px rgba(0,242,255,0.2)',
        'magenta-glow': '0 0 10px #bc13fe, 0 0 30px rgba(188,19,254,0.2)',
      },
    },
  },
  plugins: [],
}
export default config

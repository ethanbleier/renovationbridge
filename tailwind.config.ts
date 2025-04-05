import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#313bc0',
        secondary: '#002c66',
        gray: '#717171',
        black: '#000000',
        cream: '#f2f0e9',
        lavender: '#e5e4f0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-8px) rotate(0.5deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
        'shine': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scaleIn': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delay': 'float-delay 9s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      // 3D Transform utility classes
      transitionProperty: {
        'transform': 'transform',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-5': 'rotateY(5deg)',
        'x-5': 'rotateX(5deg)',
      },
      translate: {
        'z-10': 'translateZ(10px)',
        'z-0': 'translateZ(0px)',
        '-z-10': 'translateZ(-10px)',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#313bc0',
              '&:hover': {
                color: '#262e99',
              },
            },
            h1: {
              color: '#002c66',
            },
            h2: {
              color: '#002c66',
            },
            h3: {
              color: '#002c66',
            },
            h4: {
              color: '#002c66',
            },
            strong: {
              color: '#002c66',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 
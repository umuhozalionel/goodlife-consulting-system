import type { Config } from 'tailwindcss'
import tailwindColors from 'tailwindcss/colors'
import customColors from './src/theme/colors'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    fontFamily: {
      sans: ['"InterVariable"', 'Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      colors: {
        emerald: tailwindColors.emerald,
        amber: tailwindColors.amber,
        ...customColors,
        primary: {
          DEFAULT: customColors.primary,
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: tailwindColors.gray[700],
          foreground: '#ffffff',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':     { 'background-position': '100% 50%' },
        },
        particleAnimation: {
          from: { 'background-position': '0 0' },
          to:   { 'background-position': '400px 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        gradientShift:    'gradientShift 18s ease infinite',
        particleAnimation:'particleAnimation 20s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor:       ['dark'],
      borderColor:     ['dark'],
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
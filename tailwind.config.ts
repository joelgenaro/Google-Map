import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
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
        'airseed-dark-blue': '#323172',
        'airseed-light-blue': '#504f86',
      },
      spacing: {
        120: '480px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2lg': '10px',
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
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
      },
      minHeight: {
        '92': '23rem',
        '114': '464px',
        'snm-upload-geojson': 'calc(100vh - 464px)',
        'snm-mapbox': 'calc(100vh - 46px)',
        'snm-seeds-table': 'calc(100vh - 318px)',
      },
      maxHeight: {
        '92': '23rem',
        '114': '464px',
        'snm-upload-geojson': 'calc(100vh - 464px)',
        'snm-mapbox': 'calc(100vh - 46px)',
        'snm-seeds-table': 'calc(100vh - 318px)',
      },
      minWidth: {
        '1/2': '50vw',
        '1/3': '33.333333vw',
        '1/4': '25vw',
        '1/5': '20vw',
        '1/6': '16.666667vw',
        '1/8': '12.5vw',
        '1/10': '10vw',
        '1/12': '8.333333vw',
        '1/16': '6.25vw',
        '2/3': '66.666667vw',
        '3/4': '75vw',
        '3/10': '30vw',
        '4/10': '40vw',
        '6/10': '60vw',
        full: '100vw',
        '136': '544px',
      },
      boxShadow: {
        around: '0 0 15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

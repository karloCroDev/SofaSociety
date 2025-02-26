// External packages
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /w-column-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /offset-(1|2|3|4|5|6|7|8|9|10|11)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        red: {
          900: '#BD3207',
          400: '#DF4718',
        },
        yellow: {
          400: '#FFEFB7',
        },
        gray: {
          900: '#050505', // Figma-black
          800: '#1F1F20',
          700: '#3A3A3B',
          600: '#545457',
          500: '#808080',
          400: '#A3A3A3',
          300: '#BBBBBB',
          200: '#D1D1D1',
          100: '#E7E7E7',
          50: '#F4F4F4',
          30: '#F8F8F9',
          20: '#FBFBFB',
          10: '#FDFDFD', // Figma-white
        },
      },
      fontSize: {
        '4xl': '56px',
        '3xl': '48px',
        '2xl': '40px',
        xl: '32px',
        lg: '24px',
        md: '20px',
        base: '16px',
        sm: '12px',
      },
      lineHeight: {
        12: '48px',
      },
      spacing: {
        22: '88px',
        85: '340px',
        popover: 'var(--trigger-width)',
      },
      borderWidth: {
        6: '6px',
      },
      zIndex: {
        max: '999',
      },
    },
    keyframes: {
      'slide-down-accordion': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'slide-up-accordion': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      'slide-down-collapsible': {
        from: { height: '0' },
        to: { height: 'var(--radix-collapsible-content-height)' },
      },
      'slide-up-collapsible': {
        from: { height: 'var(--radix-collapsible-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'slide-down-accordion': 'slide-down-accordion 0.3s ease-out',
      'slide-up-accordion': 'slide-up-accordion 0.3s ease-out',
      'slide-down-collapsible': 'slide-down-collapsible 0.3s ease-out',
      'slide-up-collapsible': 'slide-up-collapsible 0.3s ease-out',
    },
  },
  plugins: [],
} satisfies Config;

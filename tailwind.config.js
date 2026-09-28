/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#EEF4FF',
          100: '#E0ECFF',
          200: '#C3D9FF',
          300: '#94BCFF',
          400: '#5E95FF',
          500: '#1560F0',
          600: '#0B5FFF',
          700: '#1E2A78',
          800: '#162060',
          900: '#0B1B8C',
          950: '#070E4A',
        },
        navy: {
          DEFAULT: '#0B1B8C',
          dark: '#070E4A',
          medium: '#1E2A78',
          light: '#2D3E9A',
        },
        // Domain Colors
        career: {
          DEFAULT: '#1560F0',
          light: '#EEF4FF',
          dark: '#0B4BC0',
        },
        learn: {
          DEFAULT: '#16A34A',
          light: '#F0FDF4',
          dark: '#15803D',
        },
        business: {
          DEFAULT: '#F26A1B',
          light: '#FFF7ED',
          dark: '#D4560E',
        },
        expert: {
          DEFAULT: '#7C3AED',
          light: '#F5F3FF',
          dark: '#6D28D9',
        },
        // Accent
        accent: {
          orange: '#F26A1B',
          green: '#16A34A',
          yellow: '#EAB308',
        },
        // Neutral
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Background
        bg: {
          light: '#F3F7FF',
          lighter: '#EEF4FF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['2.75rem', { lineHeight: '1.15', fontWeight: '800' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', fontWeight: '700' }],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'lg-card': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.08)',
        'modal': '0 20px 60px rgba(0,0,0,0.3)',
        'nav': '0 2px 8px rgba(0,0,0,0.08)',
      },
      maxWidth: {
        'container': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'count-up': 'countUp 1.5s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B1B8C 0%, #1E2A78 40%, #1560F0 100%)',
        'cta-gradient': 'linear-gradient(135deg, #0B1B8C 0%, #1560F0 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%)',
      },
    },
  },
  plugins: [],
}

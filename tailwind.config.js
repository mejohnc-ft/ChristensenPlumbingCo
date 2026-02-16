/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // SAN DIEGO HERITAGE PALETTE - Navy Blue & Gold

        // Navy - Deep blues inspired by San Diego harbor
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#6B8BAE',
          500: '#3D5A80',
          600: '#2C4A6E',
          700: '#1E3A5F',
          800: '#152E4D',
          900: '#0B1D33',
          950: '#06101E',
        },

        // Cream - Warm whites and off-whites
        cream: {
          50: '#FFFDF8',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EBE4D8',
          400: '#D9CFBF',
          500: '#B8AD9E',
          600: '#958979',
          700: '#736858',
          800: '#564D40',
          900: '#3D362C',
        },

        // Gold - Rich golds inspired by Gaslamp Quarter elegance
        gold: {
          50: '#FDF9F0',
          100: '#F9EFCF',
          200: '#F0DCA0',
          300: '#E5C76E',
          400: '#D4AF37',
          500: '#C5961A',
          600: '#A67C15',
          700: '#876310',
          800: '#6B4E0B',
          900: '#4A3507',
          950: '#291C03',
        },

        // Patina Green - Darker, richer
        patina: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#2E7D52',
          600: '#256644',
          700: '#1B5036',
          800: '#133A28',
          900: '#0A2419',
          950: '#05140D',
        },

        // Emergency Red - For urgent CTAs
        emergency: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // Semantic theme tokens (CSS custom properties)
        t: {
          page: 'rgb(var(--t-page) / <alpha-value>)',
          'page-alt': 'rgb(var(--t-page-alt) / <alpha-value>)',
          card: 'rgb(var(--t-card) / <alpha-value>)',
          'card-border': 'rgb(var(--t-card-border) / <alpha-value>)',
          text: 'rgb(var(--t-text) / <alpha-value>)',
          'text-secondary': 'rgb(var(--t-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--t-text-muted) / <alpha-value>)',
          header: 'rgb(var(--t-header) / <alpha-value>)',
          'header-border': 'rgb(var(--t-header-border) / <alpha-value>)',
          footer: 'rgb(var(--t-footer) / <alpha-value>)',
          'footer-border': 'rgb(var(--t-footer-border) / <alpha-value>)',
        },
      },

      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Editorial display sizes
        'display-hero': ['5.5rem', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-xl': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        'full': '9999px',
      },

      boxShadow: {
        'editorial': '0 30px 60px -15px rgba(11, 29, 51, 0.20)',
        'card': '0 4px 20px 0 rgba(11, 29, 51, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(11, 29, 51, 0.15)',
        'gold': '0 4px 20px 0 rgba(197, 150, 26, 0.3)',
        'gold-hover': '0 8px 30px 0 rgba(197, 150, 26, 0.4)',
      },

      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in-down': 'fade-in-down 0.8s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'line-grow': 'line-grow 1.2s ease-out',
        'number-tick': 'number-tick 0.6s ease-out',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'line-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'number-tick': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
    },
  },
  plugins: [],
};

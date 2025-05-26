import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#007AFF',
          50: '#EBF4FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#007AFF',
          700: '#0056CC',
          800: '#1E40AF',
          900: '#1E3A8A',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#64748B',
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
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#FF3B30',
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          300: '#FFA8A8',
          400: '#FF8080',
          500: '#FF3B30',
          600: '#FF2D20',
          700: '#E00',
          800: '#C00',
          900: '#A00',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B'
        },
        accent: {
          DEFAULT: '#F8FAFC',
          foreground: '#0F172A'
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A'
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A'
        }
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      fontSize: {
        '13': '13px',
        '15': '15px',
        '17': '17px',
        '22': '22px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemSystemFont',
          'Apple SD Gothic Neo',
          'Pretendard Variable',
          'Pretendard',
          'Roboto',
          'Noto Sans KR',
          'Segoe UI',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: ['Inter', 'system-ui', 'sans-serif'],
  			geist: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
  			mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
  		},
  		fontSize: {
  			// Vercel Geist Typography System
  			'heading-72': ['4.5rem', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '-0.02em' }],
  			'heading-64': ['4rem', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '-0.02em' }],
  			'heading-56': ['3.5rem', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '-0.02em' }],
  			'heading-48': ['3rem', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '-0.02em' }],
  			'heading-40': ['2.5rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
  			'heading-32': ['2rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
  			'heading-24': ['1.5rem', { lineHeight: '1.33', fontWeight: '600', letterSpacing: '-0.01em' }],
  			'heading-20': ['1.25rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.01em' }],
  			'heading-16': ['1rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '-0.01em' }],
  			'heading-14': ['0.875rem', { lineHeight: '1.57', fontWeight: '600', letterSpacing: '0' }],
  			
  			'label-20': ['1.25rem', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0' }],
  			'label-18': ['1.125rem', { lineHeight: '1.56', fontWeight: '500', letterSpacing: '0' }],
  			'label-16': ['1rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0' }],
  			'label-14': ['0.875rem', { lineHeight: '1.43', fontWeight: '500', letterSpacing: '0' }],
  			'label-13': ['0.8125rem', { lineHeight: '1.38', fontWeight: '500', letterSpacing: '0' }],
  			'label-12': ['0.75rem', { lineHeight: '1.33', fontWeight: '500', letterSpacing: '0' }],
  			
  			'copy-24': ['1.5rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
  			'copy-20': ['1.25rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
  			'copy-18': ['1.125rem', { lineHeight: '1.56', fontWeight: '400', letterSpacing: '0' }],
  			'copy-16': ['1rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
  			'copy-14': ['0.875rem', { lineHeight: '1.57', fontWeight: '400', letterSpacing: '0' }],
  			'copy-13': ['0.8125rem', { lineHeight: '1.54', fontWeight: '400', letterSpacing: '0' }],
  			
  			'button-16': ['1rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0' }],
  			'button-14': ['0.875rem', { lineHeight: '1.43', fontWeight: '500', letterSpacing: '0' }],
  			'button-12': ['0.75rem', { lineHeight: '1.33', fontWeight: '500', letterSpacing: '0' }],
  		},
  		colors: {
  			// Vercel Geist Color System
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			
  			// Gray scale (Vercel's primary neutral colors)
  			gray: {
  				50: 'hsl(var(--gray-50))',
  				100: 'hsl(var(--gray-100))',
  				200: 'hsl(var(--gray-200))',
  				300: 'hsl(var(--gray-300))',
  				400: 'hsl(var(--gray-400))',
  				500: 'hsl(var(--gray-500))',
  				600: 'hsl(var(--gray-600))',
  				700: 'hsl(var(--gray-700))',
  				800: 'hsl(var(--gray-800))',
  				900: 'hsl(var(--gray-900))',
  				950: 'hsl(var(--gray-950))',
  			},
  			
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))',
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				foreground: 'hsl(var(--warning-foreground))',
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info))',
  				foreground: 'hsl(var(--info-foreground))',
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: { opacity: '0', transform: 'translateY(10px)' },
  				to: { opacity: '1', transform: 'translateY(0)' },
  			},
  			'slide-in': {
  				from: { transform: 'translateX(-100%)' },
  				to: { transform: 'translateX(0)' },
  			},
  			'shimmer': {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.3s ease-out',
  			'slide-in': 'slide-in 0.3s ease-out',
  			'shimmer': 'shimmer 2s ease-in-out infinite',
  		},
  		boxShadow: {
  			'vercel': '0 8px 30px rgb(0,0,0,0.12)',
  			'vercel-hover': '0 30px 60px rgb(0,0,0,0.12)',
  			'geist': '0 0 0 1px rgba(0,0,0,.08), 0 4px 6px rgba(0,0,0,.04)',
  			'geist-hover': '0 0 0 1px rgba(0,0,0,.08), 0 8px 15px rgba(0,0,0,.08)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Gradient colors used in sliders
    'from-blue-600', 'via-purple-600', 'to-indigo-600',
    'from-emerald-600', 'via-teal-600', 'to-cyan-600',
    'from-orange-600', 'via-red-600', 'to-pink-600',
    'from-violet-600', 'via-purple-600', 'to-fuchsia-600',
    'from-purple-600', 'via-pink-600', 'to-rose-600',
    'from-orange-600', 'via-amber-600', 'to-yellow-600',
    'from-emerald-600', 'via-green-600', 'to-lime-600',
    'from-blue-600', 'via-cyan-600', 'to-teal-600',
    'from-blue-600', 'via-indigo-600', 'to-purple-600',
  ]
};
export default config;

import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#10b981',
					'primary-content': '#f3f4f6',
					secondary: '#34d399',
					'secondary-content': '#001014',
					accent: '#a7f3d0',
					'accent-content': '#13160f',
					neutral: '#d1d5db',
					'neutral-content': '#101011',
					'base-100': '#fefefe',
					'base-200': '#dddddd',
					'base-300': '#bdbdbd',
					'base-content': '#161616',
					info: '#2563eb',
					'info-content': '#d2e2ff',
					success: '#059669',
					'success-content': '#f3f4f6',
					warning: '#fef08a',
					'warning-content': '#161407',
					error: '#ff0000',
					'error-content': '#f3f4f6'
				}
			}
		]
	},
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
				primary: {
					DEFAULT: '#10b981',
					foreground: '#f3f4f6'
				},
				background: '#fefefe',
				'background-modal': '#111827',
				'vontainer-bg': '#ffffff',
				'header-bg': '#ffffff',
				stroke: '#d1d5db',
				'text-disabled': '#d1d5db',
				'text-primary': '#111827',
				'text-secondary': '#6B7280',
				'icon-bg': '#f2f6ff',
				'primary-rent': '#2563eb',
				'green-50': '#F2FFF2',
				'green-300': '#CDF4CD',
				'green-500': '#22C55D',
				'purple-50': '#FAF5FF',
				'purple-100': '#f3e8ff',
				'purple-400': '#c084fc',
				'cyan-50': '#ECFEFF',
				'cyan-300': '#67E8F9',
				'cyan-400': '#22D3EE',
				'orange-50': '#FFF0D0',
				'orange-300': '#FFB775',

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				foreground: 'hsl(var(--foreground))',
				secondary: {
					DEFAULT: '#34d399',
					foreground: '#001014'
				},
				destructive: {
					DEFAULT: '#ff0000',
					foreground: '#f3f4f6'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#a7f3d0',
					foreground: '#13160f'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [require('daisyui')]
};

export default config;

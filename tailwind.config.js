/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				c1: {
					'50': '#fffaeb',
					'100': '#fff0c6',
					'200': '#ffdf88',
					'300': '#ffc84a',
					'400': '#ffb834',
					'500': '#f98e07',
					'600': '#dd6802',
					'700': '#b74606',
					'800': '#94350c',
					'900': '#7a2c0d',
					'950': '#461502',
				}
			}
		},
  },
  plugins: [],
}


const colors = require('./tailwind-colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
    screens: {
      xs: '593px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      dark: '#2f3136',
      borderColor: '#ccc',
      primary: {
        100: '#dee3ea',
        200: '#b2bdcd',
        300: '#5d7290',
        600: '#323d4d',
        700: '#242c37',
        800: '#151a21',
        900: '#0b0e11',
      },
      secondary: {
        DEFAULT: '#5575e7',
        'washed-out': '#879eed',
      },
      accent: {
        DEFAULT: '#fd4d4d',
        hover: '#fd6868',
        disabled: '#f5bfbf',
      },
    },
    extend: {},
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled']),
    textColor: ({ after }) => after(['disabled']),
  },
  plugins: [],
};

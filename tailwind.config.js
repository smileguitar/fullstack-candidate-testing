/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#333333',
      'disabled': '#b4b4b4',
    }),
    extend: {
      colors: {
        'primary-blue': '#2c90f5',
      },
      maxWidth: {
        'layout-max': '90rem',
      },
      spacing: {
        'modal-width': '70rem',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

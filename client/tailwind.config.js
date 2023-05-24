/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
      },
      colors: {
        color1: '#1DC9C7', 
        color2: '#149E9C',
        color3: '#CF6696',
        color4: '#fff1f3'
      },
      textShadow: {
        'sm': '1px 1px 1px rgba(0, 0, 0, 0.5)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
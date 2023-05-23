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
    },
  },
  plugins: [],
}
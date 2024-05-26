/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/MessageScreen.js"
  ],
  theme: {
    extend: {
      colors: {
        'main': 'rgb(38, 56, 78)',
        'mainGolden':'rgb(181, 154, 101)',
        'messRec':'rgb(52, 66, 85)'
      },
    },
  },
  plugins: [],
}

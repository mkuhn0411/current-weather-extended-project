module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'medium-blue': '#0099ff',
        'dark-blue': '#004d80',
        'purple': '#8533ff'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

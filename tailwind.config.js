/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        interbold: ["Inter-Bold", "sans-serif"],
        greyqo: ["GreyQo", "sans-serif"],
        intersemibold: ["Inter-Semi-Bold", "sans-serif"],
        interregular: ["Inter-Regular", "sans-serif"],
        
      }
    },

  },
  plugins: [],
}


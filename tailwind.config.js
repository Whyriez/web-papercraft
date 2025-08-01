module.exports = {
  darkMode: "class", // <- pastikan ini ada
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8b4d9", // pink-300
        secondary: "#90cdf4", // blue-300
        accent: "#fbd38d", // orange-300
        neutral: "#f7fafc", // gray-100
        dark: "#4a5568", // gray-700
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};

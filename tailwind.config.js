module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00AC68",
        "background-light": "#f6f8f6",
        "background-dark": "#112114",
      },
      fontFamily: {
        display: ["Public Sans"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    }
  },
  plugins: []
}
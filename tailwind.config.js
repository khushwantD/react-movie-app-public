/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        searchbg: "url('./src/assets/images/movies.jpg')",
      },
      colors: {
        regalPurple: "#DBC4F0",
      },
      backgroundColor: {
        navbarBg0: "#03001C",
        genreBg: "#ECF2FF",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        
        Darkgreen: "#29B612",
        DarkGray: "#716C6C",
        LightGray: "#776D6D",
        LightXlGray: "#9B9494",
        LightBlak: "#3E3C3C",
        darkBlue: "hsl(213.86, 58.82%, 46.67%)",
        lightGreen: "hsl(156.62, 73.33%, 58.82%)",
      },
      fontFamily: {
        // sans: ["Poppins", "sans-serif"],
        sans: ["Cairo", "sans-serif"],

      },
      spacing: {
        180: "32rem",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",// it use to be 1020
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        dashboardGradient: 'linear-gradient(90deg, rgba(168,253,141,1) 0%, rgba(206,253,116,1) 35%, rgba(200,237,220,1) 100%)',
      },
      colors: {        
        Darkgreen: "#29B612",
        WhiteGreen: "#7AEE68",
        DarkGray: "#716C6C",
        LightGray: "#776D6D",
        LightXlGray: "#9B9494",
        LightBlak: "#3E3C3C",
        LightTextCol: "#ACAAAA",
        WhiteRed: "#FF5E5E",
        WhiteYellow: "#F1E92A",
        WhiteBlue: "#0672C0",
        bgWhight: "#F7F7F7",
        OutlineBlue: "#088FF0",

        darkBlue: "hsl(213.86, 58.82%, 46.67%)",
        lightGreen: "hsl(156.62, 73.33%, 58.82%)",

        BackgroundBody: "#F7F7F7",
        Glass: 'rgba(255, 255, 255, 0.692)',

      },
      aspectRatio: {
        '9/16': '9 / 16',
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

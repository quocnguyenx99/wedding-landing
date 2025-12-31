/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      xs: "360px", // Android nhỏ phổ biến
      sm: "390px", // mốc chính (iPhone 12/13/14)
      mb: "430px", // mobile lớn / Pro Max
      md: "768px", // tablet
      lg: "1024px", // tablet ngang / laptop nhỏ
      xl: "1280px", // desktop
      "2xl": "1512px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        wedding: {
          sand: "#F2E7B1",
          beige: "#F0E1CE",
          charcoal: "#2D2D2D",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['"Acid Grotesk"', "system-ui", "sans-serif"],
        script: ['"Tempting"', "cursive"],
        display: ['"Beautique Display"', "serif"],
      },
    },
  },
  plugins: [],
};

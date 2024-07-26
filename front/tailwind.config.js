/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primaryColor: "#496989",
        green1: "#E2F4C5",
        green2: "#A8CD9F",
        green3: "#58A399",
      },
    },
  },
  plugins: [],
};

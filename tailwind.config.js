/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./component.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        primary : "#2D487A",
        secondary : {
          DEFAULT : "#132341",
          100 : "#28358A"
        }
      }
    },
  },
  plugins: [],
}
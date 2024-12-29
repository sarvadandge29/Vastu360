/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./component.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        primary : "#112D4E",
        secondary : {
          DEFAULT : "#38659C",
          100 : "#3F72AF"
        },
        tertiary : {
          DEFAULT : "#DBE2EF",
        },
      }
    },
  },
  plugins: [],
}
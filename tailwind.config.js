/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // light
        "bg-light": "#FFFFFF",
        "surface-light": "#F7F7FA",
        "primary-light": "#0B5FFF",
        "secondary-light": "#6B7280",
        "muted-light": "#9CA3AF",
        "border-light": "#E6E7EB",
        // dark
        "bg-dark": "#0B1020",
        "surface-dark": "#0F1724",
        "primary-dark": "#60A5FA",
        "secondary-dark": "#9CA3AF",
        "muted-dark": "#6B7280",
        "border-dark": "#1F2937",
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
};

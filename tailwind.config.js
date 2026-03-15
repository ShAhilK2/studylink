/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: "#2AABEE", // Telegram blue
          "primary-dark": "#1A8FCC", // Darker Telegram blue
          "primary-light": "#6DCDF5", // Lighter Telegram blue
          background: "#17212B", // Telegram dark background
          surface: "#232E3C", // Telegram chat list / panel bg
          "surface-dark": "#0E1621", // Deepest dark (sidebar/drawer)
          "surface-light": "#2B5278", // Telegram selected/highlighted item
          foreground: "#FFFFFF", // Primary white text
          "foreground-muted": "#8BA7C7", // Secondary grey-blue text
          "foreground-subtle": "#4F6A84", // Dimmed/placeholder text
          accent: "#6AB3F3", // Link blue / accent
          "accent-secondary": "#4FAD7A", // Online green indicator
          success: "#4FAD7A", // Telegram green (online, delivered)
          warning: "#E5A43A", // Warning amber
          danger: "#E25A5A", // Error / delete red
          border: "#1C2B3A", // Divider / border dark
          "border-light": "#2C3E50", // Lighter border / separator
        },
      },
    },
    plugins: [],
  }
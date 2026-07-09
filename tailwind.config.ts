import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "airbnb-rausch": "#FF385C",     // primary brand/accent
        "airbnb-ink": "#222222",        // primary text color
        "airbnb-gray": "#717171",       // secondary text
        "airbnb-border": "#DDDDDD",     // dividers, card borders
        "airbnb-light-gray": "#F7F7F7", // hover states backgrounds
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0px 1px 12px rgba(0, 0, 0, 0.08)",
        "booking-card": "0px 12px 24px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

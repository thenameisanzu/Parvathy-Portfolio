import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#2A2140",
          light: "#2A2140",
          dark: "#F4EDFF",
          muted: "#63597D",
          "muted-dark": "#A99EC5",
        },
        lav: {
          DEFAULT: "#C9B8F5",
          dark: "#9F83FF",
        },
        blush: {
          DEFAULT: "#F9C6D4",
          dark: "#FF7AA2",
        },
        mist: {
          DEFAULT: "#F7F1FF",
          dark: "#1A152C",
        },
        night: {
          900: "#090710",
          800: "#0F0B1A",
          700: "#171228",
          600: "#221A3B",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

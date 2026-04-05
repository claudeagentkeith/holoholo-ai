import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          500: "#0077B6",
          700: "#023E8A"
        },
        volcanic: "#1A1A2E",
        plumeria: "#FAFAFA",
        coral: "#FF6B6B",
        sand: "#F6F1E9",
        leaf: "#356859"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

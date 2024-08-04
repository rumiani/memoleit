import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        merge: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        boldBlink: {
          '0%, 100%': { fontWeight: 'normal' },
          '50%': { fontWeight: 'bold' },
        },
      },
      animation: {
        merge: "merge 0.3s ease-in",
        boldBlink: 'boldBlink 1s ease-in infinite',
      },
    },
  },
  plugins: [],
};
export default config;

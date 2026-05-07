import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        card: "rgba(255, 255, 255, 0.06)",
        neon: "#3B82F6",
        accent: "#8B5CF6"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(59,130,246,0.25)"
      }
    }
  },
  plugins: []
};

export default config;

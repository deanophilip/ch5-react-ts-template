import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/routes/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        HpBlue: "var(--HpBlue)",
        HpYellow: "var(--HpYellow)",
        HpWhite: "var(--HpWhite)",
        HpLightBlue: "var(--HpLightBlue)",
        HpGreen: "var(--HpGreen)",
      },
      fontFamily:{
        HpPrimary: "var(--HpPrimary-font)",
        HpSecondary: "var(--HpSecondary-font)",
      }
    },
  },
  plugins: [],
} satisfies Config;

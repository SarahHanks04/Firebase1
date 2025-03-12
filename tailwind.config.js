/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        bulb: {
          blue: "#13162D",
          yellow: "#FDBF17",
          white: "#FAF4F4",
          success: "#2AAD1E",
          lightBlue: "#F7F8FB",
        },
        black: "#000000",
        light: {
          background: "var(--background-light)",
          text: "var(--text-light)",
          accent: "var(--accent-light)",
          muted: "var(--muted-light)",
          border: "var(--border-light)",
        },
        dark: {
          background: "var(--background-dark)",
          text: "var(--text-dark)",
          accent: "var(--accent-dark)",
          muted: "var(--muted-dark)",
          border: "var(--border-dark)",
        },
        grey: {
          50: "#EAEAEA",
          200: "#9D9D9D",
          300: "#707070",
          500: "#29292A",
          800: "#171717",
        },
        neutral: {
          dark: "#4A4848",
          light: "#F8F5F5",
        },
        // light: {
        //   background: "#FAF4F4", // TheBulb White
        //   text: "#13162D", // TheBulb Blue
        //   accent: "#FDBF17", // TheBulb Yellow
        //   muted: "#9D9D9D", // LightGrey 200
        //   border: "#EAEAEA", // LightGrey 50
        // },
        // dark: {
        //   background: "#171717", // Grey 800
        //   text: "#FAF4F4", // TheBulb White
        //   accent: "#FDBF17", // TheBulb Yellow
        //   muted: "#707070", // DarkGrey 300
        //   border: "#29292A", // LightGrey 500
        // },
        shared: {
          success: "#2AAD1E", // TheBulb Success
          lightBlue: "#F7F8FB", // TheBulb Light Blue
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

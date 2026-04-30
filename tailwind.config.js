/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
      },
      colors: {
        // IDE-style dark palette
        bg: {
          base: "#0d1117",
          surface: "#161b22",
          elevated: "#21262d",
          border: "#30363d",
        },
        accent: {
          blue: "#58a6ff",
          green: "#3fb950",
          purple: "#bc8cff",
          orange: "#f78166",
          yellow: "#e3b341",
        },
      },
    },
  },
  plugins: [],
};

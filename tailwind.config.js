/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "calc-100vh-2px": "calc(100vh - 2px)",
      },
      width: {
        "calc-100%-2px": "calc(100% - 2px)",
        "max-w-calc-100%-50px": "calc(100% - 50px)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(65, 164, 253, 1), rgba(14, 244, 255, 1))',
      },
    },
  },
  plugins: [],
};

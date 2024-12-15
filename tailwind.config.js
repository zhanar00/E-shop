/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        greenPrimary: '#6cc56c', // Your primary green color
        darkGray: '#333',
      },
    },
  },
  plugins: [],
};

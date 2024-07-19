/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust according to your project structure
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#001f3f', // Custom dark blue color
        'gold': '#ffdd57'       // Custom gold color
      }
    },
  },
  plugins: [],
}

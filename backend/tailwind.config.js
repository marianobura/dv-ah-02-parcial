/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'body': '300px 1fr',
      }
    },
  },
  plugins: [],
}


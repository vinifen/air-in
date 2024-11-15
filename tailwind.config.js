/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white-50': 'rgba(255, 255, 255, 0.2)',
      },
      colors: {
        primary: '#575757',
      },
      height: {
        '15/16': '93.75%',
        '1/10': '10%',  
        '9/10': '90%',
      },
      spacing: {
        '14/15': '93.33%',  
      },
      inset: {
        '14/15': '93.33%',  
      }
    },
  },
  plugins: [],
}
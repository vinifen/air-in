/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white-50': 'rgba(255, 255, 255, 0.5)',
        'black-50': 'rgba(174, 174, 174, 0.2)',
      },
      colors: {
        primary: '#575757',
      },
      height: {
        '15/16': '93.75%',
        '1/10': '10%',  
        '9/10': '90%',
      },
      width: {
        '15/16': '93.75%',
      },
      spacing: {
        '14/15': '93.33%',  
        '18': '4.5rem',
        '17': '4.25rem',
      },
      inset: {
        '14/15': '93.33%',  
      },
      
    },
  },
  plugins: [],
}
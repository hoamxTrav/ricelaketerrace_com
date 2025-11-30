/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system','BlinkMacSystemFont','"Segoe UI"','Roboto','Oxygen','Ubuntu','Cantarell',
          '"Helvetica Neue"','Arial','"Apple Color Emoji"','"Segoe UI Emoji"','"Noto Color Emoji"', 'sans-serif'
        ],
      },
      colors: {
        cherry:   '#D96C9D',
        lawn:     '#7BA65D',
        bark:     '#6B4E3D',
        maple:    '#B22222',
        charcoal: '#2C2C2C',
        beige:    '#F3F2EF',
        cloud:    '#D9D9D9',
      },
      backgroundImage: {
        'hoa-wide': 'url("/rltta-bg.jpg")', // put the file at: public/rltta-bg.jpg
      },
    },
  },
  plugins: [],
}

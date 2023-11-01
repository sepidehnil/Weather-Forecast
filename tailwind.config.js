/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  purge: ['./*.{html,js}'],
  theme: {
    extend: {
      keyframes: {
        move: {
          '0%': { transform: 'translateY(-100%)',opacity:'0' },
          '100%': { transform: 'translateY(-50%)',opacity:'1' },

        },
        move_left:{
          '0%': { transform: 'translateX(-100%)',opacity:'0' },
          '100%': { transform: 'translateX(0)',opacity:'1' },
        },
        fadeOut:{
          '0%': { opacity:'0' },
          '100%': {opacity:'1' },
        },
        openslid:{
          '0%': { width:'0' },
          '100%': {width:'40%' },
        },
        moveUp:{
          '0%': { transform: 'translateY(200px) translateX(-50%)' },
          '100%': {transform: 'translateY(0) translateX(-50%)' },
        },
        moveDown:{
          '0%': { transform: 'translateY(0) translateX(-50%)' },
          '100%': {transform: 'translateY(200px) translateX(-50%)' },
        },
      },
      animation: {
        'move': 'move 2s ease',
        'left': 'move_left 1.8s ease',
        'fade-out': 'fadeOut 4s ease',
        'openslid': 'openslid 1s ease',
        'moveUp': 'moveUp .8s ease-in forwards',
        'moveDown': 'moveDown .8s ease-in forwards',
      }
    },
  },
  plugins: [],
}


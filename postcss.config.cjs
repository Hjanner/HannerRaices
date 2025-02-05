// module.exports = {
//   plugins: [require('tailwindcss'), require('autoprefixer')],
// };

// module.exports = {
//   plugins: [
//     require('tailwindcss')({
//       content: ['./src/**/*.{html,js,jsx,ts,tsx,pug}'], // Ajusta la ruta según tus archivos
//     }),
//     require('autoprefixer'),
//   ],
// };

const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Un azul moderno
        secondary: '#F59E0B', // Un amarillo/naranja para acentos
      },
    },
  },
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
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
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
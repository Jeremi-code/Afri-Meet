/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens : {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'msm': {min: '420px', max: '639px'},
      'mism': {max: '785px',min:'640px'},
      'milg': {min: '786px', max: '930px'},
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'mlg':'931px',
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1300px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}


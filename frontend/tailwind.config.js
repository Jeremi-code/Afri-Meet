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
      'msm': {min: '420px', max: '639px'},
      'lsm':{max:'419px',min:'292px'},
      'mlsm':{max:'292px'},
      'mism': {max: '785px',min:'640px'},
      'milg': {min: '786px', max: '930px'},
      'md': '768px',
      'mlg':'931px',
      'lg': '1024px',
      'xl': '1200px',
      '2xl': '1300px',
    },
    extend: {},
  },
  plugins: [],
}


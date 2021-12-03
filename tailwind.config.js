
module.exports = {
  // prefix: "tw-",
  important: true,
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        navbarColor: '#0013D4',
      },
      fontFamily: {
        "poppins-semibold": ['Poppins Semibold', 'sans-serif']
      },
      
      boxShadow: {
        'custom': '0px 10px 40px rgba(46, 40, 212, 0.1)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};

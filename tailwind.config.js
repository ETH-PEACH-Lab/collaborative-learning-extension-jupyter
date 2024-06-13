module.exports = {
  mode: 'jit',
  content: [
    './src/ui/src/**/*.{js,jsx,ts,tsx}',
    './src/widget/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-quiz-ui/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [require('daisyui')]
};

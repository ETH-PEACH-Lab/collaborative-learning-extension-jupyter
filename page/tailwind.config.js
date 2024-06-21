module.exports = {
  mode: 'jit',
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-quiz-ui/**/*.{js,jsx,ts,tsx}',
    '../src/ui/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [require('daisyui')]
};

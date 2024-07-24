let tailwind = require('../tailwind.config');
module.exports = {
  ...tailwind,
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    '../node_modules/react-quiz-ui/**/*.{js,jsx,ts,tsx}',
    '../src/ui/src/**/*.{js,jsx,ts,tsx}'
  ]
};

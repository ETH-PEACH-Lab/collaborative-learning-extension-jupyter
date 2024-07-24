let tailwind = require('../../tailwind.config');
module.exports = {
  ...tailwind,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-quiz-ui/**/*.{js,jsx,ts,tsx}'
  ]
};

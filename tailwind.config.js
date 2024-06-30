module.exports = {
  mode: 'jit',
  content: [
    './node_modules/react-quiz-ui/**/*.{js,jsx,ts,tsx}',
    './src/ui/src/**/*.{js,jsx,ts,tsx}',
    './src/widget/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          error: '#f8d7da',
          success: '#d4edda'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};

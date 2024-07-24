module.exports = {
  mode: 'jit',
  content: [
    './node_modules/react-quiz-ui/**/*.{js,jsx,ts,tsx}',
    './src/ui/src/**/*.{js,jsx,ts,tsx}',
    './src/widget/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadein: 'fadein 0.32s ease-in-out'
      }
    }
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

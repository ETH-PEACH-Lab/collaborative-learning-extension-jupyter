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
        },
        flip: {
          '0%': { marginBottom: '-50px', marginTop: '50px', opacity: '0' },
          '100%': { marginLeft: '0', marginRight: '0', opacity: '1' }
        }
      },
      animation: {
        fadein: 'fadein 0.32s ease-in-out',
        slideIn: 'flip 0.32s ease-in-out both'
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

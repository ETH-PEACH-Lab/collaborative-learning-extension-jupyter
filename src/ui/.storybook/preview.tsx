import type { Preview } from '@storybook/react';
import '../src/index.css';
import '..';
import 'react-json-view-lite/dist/index.css';
const preview: Preview = {
  parameters: {
    deepControls: { enabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;

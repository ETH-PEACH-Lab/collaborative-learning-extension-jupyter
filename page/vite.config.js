import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svg from 'vite-svg-loader';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/collaborative-learning-extension-jupyter',
  plugins: [react(), svg({ defaultImport: 'raw' }),svgr()]
});

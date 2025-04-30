import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// import { configDefaults } from 'vitest/config'; // No longer needed here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'demo',
  base: '/react-cyclic-slider/',
  build: {
    outDir: '../build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      'react-cyclic-slider': resolve(__dirname, 'src/components'),
    },
  },
  // test: { ... } // Test config removed, moved to vitest.config.mjs
}); 
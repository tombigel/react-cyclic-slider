import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs'; // Import the main Vite config

// Define Vitest specific config
const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './demo/setupTests.ts',
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // No need for exclude if using default, but can be added if needed
    // exclude: [...configDefaults.exclude, 'e2e/**'], 
    css: true,
  }
});

// Merge the Vitest config with the relevant parts of the main Vite config 
// (like plugins, resolve.alias) if necessary. 
// Often, just the test config itself is enough.
// export default mergeConfig(viteConfig, vitestConfig); 
// For now, let's just export the test config directly.
export default vitestConfig; 
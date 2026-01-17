

import path from 'path';
import {
  defineConfig as defineViteConfig, mergeConfig 
} from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      // 'app-mui': path.resolve(__dirname, './src/pages/MaterialUI'),

      // Temporary disabled
      // Check tsconfig.app.json and tsconfig.node.json for paths mapping
      
      // src: '/src',
      // assets: '/src/assets',
      // components: '/src/components',
      // constants: '/src/constants',
      // hooks: '/src/hooks',
      // layouts: '/src/layouts',
      // pages: '/src/pages',
      // services: '/src/services',
      // types: '/src/types',
    },
  },
  server: {
    // Specify the port the development server will run on
    port: 3000,
    // Open the browser on server start
    open: true,
    // Ensure the server fails to start if the specified port is already in use
    strictPort: true,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    // `globals: true` means global variables will be available during tests like
    //    'describe, it, expect' so we don't have to import it in every test file
    globals: true,
    // Specified -'jsdom'- as the test environment, simulating a browser environment
    environment: 'jsdom',
  },
});

export default mergeConfig(viteConfig, vitestConfig);


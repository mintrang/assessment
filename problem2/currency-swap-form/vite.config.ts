import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
    },
  },
});

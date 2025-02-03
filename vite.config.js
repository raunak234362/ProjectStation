import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://106.51.141.125:5154',
        changeOrigin: true,
        secure: false, // For development only
      },
    },
  },
});

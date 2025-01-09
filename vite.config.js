import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.153:8000/api',
        changeOrigin: true,
        secure: false, // For development only
      },
    },
  },
});

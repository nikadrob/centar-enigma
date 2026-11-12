import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Za kasnije: frontend će dohvaćati podatke s Express servera
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: separate vendor code into its own chunk
          vendor: ['react', 'react-dom', 'jwt-decode'],
        },
      },
    },
  },
});



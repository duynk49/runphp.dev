import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle for better Core Web Vitals
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Enable minification for production
    minify: 'terser',
    // Generate source maps for debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Set target for better compatibility
    target: 'es2020',
  },
  // Performance hints
  server: {
    // Add proper caching headers in development
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use the repo subpath only for production builds (GitHub Pages project site).
  base: command === 'build' ? '/jobfair/' : '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@react-three/drei')) {
              return 'three-drei';
            }

            if (id.includes('@react-three/fiber')) {
              return 'three-fiber';
            }

            if (id.includes('/three/')) {
              return 'three-core';
            }

            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react';
            }

            if (id.includes('framer-motion')) {
              return 'motion';
            }

            if (id.includes('lucide-react')) {
              return 'icons';
            }
          }
        },
      },
    },
  },
}))

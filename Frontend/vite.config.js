import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle all node_modules into a single chunk
          }
          // You can add more custom chunking logic here if needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit to 1000 kB
  },
})

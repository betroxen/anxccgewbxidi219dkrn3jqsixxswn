import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// FIX: __dirname is not available in ES modules. This defines it for use in path resolution.
import { fileURLToPath } from 'url'

// FIX: __dirname is not available in ES modules. This defines it for use in path resolution.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // FIX: Use __dirname to resolve the path, which is a standard approach in Node.js config files.
      '@': path.resolve(__dirname, './src'),
    },
  },
})

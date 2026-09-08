import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages repository path
  base: '/ags-garden-city/',

  server: {
    port: 5173,
    strictPort: true
  }
})
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages universal relative path (works on both ags_garden_city and ags-garden-city)
  base: './',

  server: {
    port: 5173,
    strictPort: true
  }
})
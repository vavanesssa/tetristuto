import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Add the forceConsistentCasingInFileNames option
    // Set it to false to disable consistent casing enforcement
    // This can be useful if you have case-sensitive file systems
    // or if you're working in a project with mixed casing file names
    forceConsistentCasingInFileNames: false,
  },
})

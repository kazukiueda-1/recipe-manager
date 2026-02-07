import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { writeFileSync, readFileSync } from 'fs'

// Plugin to copy index.html as 404.html for GitHub Pages SPA support
function spa404Plugin() {
  return {
    name: 'spa-404',
    closeBundle() {
      const indexPath = resolve('dist', 'index.html')
      const notFoundPath = resolve('dist', '404.html')
      try {
        const content = readFileSync(indexPath, 'utf-8')
        writeFileSync(notFoundPath, content)
      } catch {}
    },
  }
}

export default defineConfig({
  plugins: [react(), spa404Plugin()],
  base: '/recipe-manager/',
})

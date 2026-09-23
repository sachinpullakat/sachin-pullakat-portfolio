import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This is a single-page site with anchor navigation, not a client-side
  // router with routes. 'mpa' disables Vite's SPA history fallback, so a
  // request for a missing static file (e.g. /resume.pdf before it's added)
  // returns a real 404 instead of silently serving index.html.
  appType: "mpa",
})

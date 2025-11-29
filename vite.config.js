// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                         // allow external access (0.0.0.0)
    port: 5173,
    allowedHosts: ['ricelaketerrace.com', 'www.ricelaketerrace.com'],

    // If HMR from external devices becomes unstable,
    // you can enable these later:
    // origin: 'http://ricelaketerrace.com',
    // hmr: { host: 'ricelaketerrace.com', protocol: 'ws' },
  },
})

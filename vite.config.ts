import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const base = isProd ? '/pwa-icons-gen/' : '/';

  return {
    base,
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        injectRegister: 'auto',
        registerType: 'prompt',
        includeAssets: [
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-192x192.png',
          'pwa-maskable-512x512.png',
          'favicon.ico',
        ],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,jpg}'],
        },
        manifest: {
          name: 'PWA 圖示產生器',
          short_name: 'PWA Icons',
          description: '專業 PWA 圖示與 Maskable Icons 產生與打包工具',
          theme_color: '#4f46e5',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'any',
          start_url: base,
          scope: base,
          id: base,
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          shortcuts: [
            {
              name: '圖示產生器',
              short_name: '產生器',
              description: '快速進入 PWA 圖示裁切產生器',
              url: './?action=generator',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: '開啟首頁',
              short_name: '首頁',
              description: '回到 PWA 圖示產生器首頁',
              url: './',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
